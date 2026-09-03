import { z } from "zod";

export const PROJECT_TYPES = [
  { value: "sitio-web", label: "Sitio Web Elite" },
  { value: "app-movil", label: "App Web / Móvil" },
  { value: "sistema-interno", label: "Sistema Interno" },
  { value: "ia-custom", label: "Producto con IA" },
  { value: "otro", label: "Otro" },
] as const;

export const leadSchema = z.object({
  projectType: z.enum([
    "sitio-web",
    "app-movil",
    "sistema-interno",
    "ia-custom",
    "otro",
  ]),
  message: z
    .string()
    .trim()
    .min(10, "Contanos un poco más — al menos 10 caracteres.")
    .max(2000, "Ese mensaje es demasiado largo."),
  contactChannel: z.enum(["email", "whatsapp"]),
  contactValue: z
    .string()
    .trim()
    .min(3, "Falta un dato de contacto válido."),
});

export type LeadInput = z.infer<typeof leadSchema>;

export function validateContactValue(
  channel: LeadInput["contactChannel"],
  value: string,
) {
  if (channel === "email") {
    return z.string().email().safeParse(value).success;
  }
  const digits = value.replace(/[^0-9]/g, "");
  return digits.length >= 8;
}
