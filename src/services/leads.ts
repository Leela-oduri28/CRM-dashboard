import { Lead, LeadStatus } from "@/types/lead";

const STATUSES: LeadStatus[] = [
    "New",
    "Contacted",
    "Qualified",
    "Lost",
];

const AGENTS = ["Alice", "Bob", "Charlie", "David"];

function generateMockLeads(count: number): Lead[] {
    return Array.from({ length: count }).map((_, index) => {
        const status = STATUSES[index % STATUSES.length];

        return {
            id: (index + 1).toString(),
            name: `Lead ${index + 1}`,
            email: `lead${index + 1}@example.com`,
            phone: `9${Math.floor(100000000 + Math.random() * 900000000)}`,
            status,
            assignedAgent: AGENTS[index % AGENTS.length],
            createdAt: new Date(
                Date.now() - index * 24 * 60 * 60 * 1000
            ).toISOString(),
        };
    });
}

let leads: Lead[] = generateMockLeads(30);

export const fetchLeads = (): Promise<Lead[]> =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve([...leads]);
        }, 800);
    });

export const updateLeadStatus = (
    id: string,
    status: LeadStatus
): Promise<void> =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.8) {
                leads = leads.map((l) =>
                    l.id === id ? { ...l, status } : l
                );
                resolve();
            } else {
                reject(new Error("Failed to update lead status"));
            }
        }, 600);
    });

// Create new lead
export const createLead = (
    input: Omit<Lead, "id" | "createdAt">
): Promise<Lead> =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            const emailExists = leads.some(
                (l) => l.email.toLowerCase() === input.email.toLowerCase()
            );

            if (emailExists) {
                reject(new Error("Lead with this email already exists"));
                return;
            }

            const newLead: Lead = {
                ...input,
                id: crypto.randomUUID(),
                createdAt: new Date().toISOString(),
            };

            leads = [newLead, ...leads];
            resolve(newLead);
        }, 600);
    });
