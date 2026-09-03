export type ProjectType =
  | "sitio-web"
  | "app-movil"
  | "sistema-interno"
  | "ia-custom"
  | "otro";

export type ContactChannel = "email" | "whatsapp";
export type LeadStatus = "new" | "contacted" | "archived";

export type LeadRow = {
  id: string;
  created_at: string;
  project_type: ProjectType;
  message: string;
  contact_channel: ContactChannel;
  contact_value: string;
  status: LeadStatus;
  notified_at: string | null;
};

export type LeadInsert = Omit<
  LeadRow,
  "id" | "created_at" | "status" | "notified_at"
> &
  Partial<Pick<LeadRow, "status" | "notified_at">>;

export type LeadUpdate = Partial<Omit<LeadRow, "id">>;

export type Database = {
  public: {
    Tables: {
      leads: {
        Row: LeadRow;
        Insert: LeadInsert;
        Update: LeadUpdate;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
