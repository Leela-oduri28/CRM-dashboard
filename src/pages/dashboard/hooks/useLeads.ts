import { useEffect, useRef, useState } from "react";
import { Lead, LeadStatus } from "../../../types/lead";
import { createLead as createLeadApi } from "../../../services/leads";
import {
    fetchLeads,
    updateLeadStatus,
} from "../../../services/leads";

export function useLeads() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        fetchLeads()
            .then((data) => {
                setLeads(data);
            })
            .catch(() => {
                setError("Failed to load leads");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const updateStatus = async (id: string, status: LeadStatus) => {
        let previousStatus: LeadStatus | null = null;

        setLeads((prev) =>
            prev.map((lead) => {
                if (lead.id === id) {
                    previousStatus = lead.status;
                    return { ...lead, status };
                }
                return lead;
            })
        );

        try {
            await updateLeadStatus(id, status);
        } catch {
            setLeads((prev) =>
                prev.map((lead) =>
                    lead.id === id && previousStatus
                        ? { ...lead, status: previousStatus }
                        : lead
                )
            );
            setError("Failed to update status");
            throw new Error("Update failed");
        }
    };


    const createLead = async (
        lead: Omit<Lead, "id" | "createdAt">
    ) => {
        const newLead = await createLeadApi(lead);
        setLeads((prev) => [newLead, ...prev]);
    };


    return { leads, loading, error, updateStatus, createLead };
}
