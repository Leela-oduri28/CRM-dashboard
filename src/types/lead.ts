export type LeadStatus = "New" | "Contacted" | "Qualified" | "Lost";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: LeadStatus;
  assignedAgent: string;
  createdAt: string; // ISO string
}
