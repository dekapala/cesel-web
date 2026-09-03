"use server";

import { Resend } from "resend";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { leadSchema, validateContactValue, type LeadInput } from "@/lib/validations/lead";

export type SubmitLeadResult =
  | { success: true }
  | { success: false; error: string };

export async function submitLead(
  input: LeadInput & { honeypot?: string },
): Promise<SubmitLeadResult> {
  // Silently accept-and-drop bot submissions that fill the hidden field.
  if (input.honeypot) {
    return { success: true };
  }

  const parsed = leadSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Datos inválidos.",
    };
  }

  const { projectType, message, contactChannel, contactValue } = parsed.data;

  if (!validateContactValue(contactChannel, contactValue)) {
    return {
      success: false,
      error:
        contactChannel === "email"
          ? "Ese email no parece válido."
          : "Dejanos un número de WhatsApp válido.",
    };
  }

  // 1. Persist the lead first. Nothing else happens if this fails.
  let leadId: string;
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("leads")
      .insert({
        project_type: projectType,
        message,
        contact_channel: contactChannel,
        contact_value: contactValue,
      })
      .select("id")
      .single();

    if (error || !data) {
      throw error ?? new Error("Insert sin datos de retorno.");
    }
    leadId = data.id as string;
  } catch (err) {
    console.error("[submitLead] Supabase insert failed:", err);
    return {
      success: false,
      error:
        "No pudimos guardar tu consulta en este momento. Probá de nuevo en unos minutos.",
    };
  }

  // 2. Only after persistence succeeds, best-effort notify by email.
  //    A failure here must not surface as a failure to the user — the
  //    lead is already safely stored and recoverable from the database.
  try {
    await notifyByEmail({ leadId, projectType, message, contactChannel, contactValue });
  } catch (err) {
    console.error("[submitLead] Email notification failed:", err);
  }

  return { success: true };
}

async function notifyByEmail(params: {
  leadId: string;
  projectType: string;
  message: string;
  contactChannel: string;
  contactValue: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyTo = process.env.CONTACT_NOTIFY_EMAIL;
  const notifyFrom = process.env.CONTACT_NOTIFY_FROM ?? "onboarding@resend.dev";

  if (!apiKey || !notifyTo) {
    console.warn(
      "[submitLead] RESEND_API_KEY o CONTACT_NOTIFY_EMAIL no configurados — se omite el email de notificación.",
    );
    return;
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: notifyFrom,
    to: notifyTo,
    subject: `Nuevo lead — ${params.projectType}`,
    text: [
      `Lead ID: ${params.leadId}`,
      `Tipo de proyecto: ${params.projectType}`,
      `Canal preferido: ${params.contactChannel}`,
      `Contacto: ${params.contactValue}`,
      "",
      "Mensaje:",
      params.message,
    ].join("\n"),
  });

  if (error) {
    throw new Error(typeof error === "string" ? error : JSON.stringify(error));
  }

  const supabase = getSupabaseServerClient();
  await supabase
    .from("leads")
    .update({ notified_at: new Date().toISOString() })
    .eq("id", params.leadId);
}
