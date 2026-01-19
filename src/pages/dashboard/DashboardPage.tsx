import { useState } from "react";

import { TopBar } from "../../components/topbar/TopBar";
import { KpiCards } from "./components/kpiCards";
import { LeadTable } from "./components/LeadTable";
import { LeadDetailsDrawer } from "./components/LeadDetailsDrawer";
import { CreateLeadModal } from "./components/CreateLeadModal";

import { useLeads } from "./hooks/useLeads";
import { Lead, LeadStatus } from "../../types/lead";
import { Button } from "@/components/ui/button";

export function DashboardPage() {
    const { leads, loading, error, updateStatus, createLead } = useLeads();
    const [Open, setOpen] = useState(false);

    const [statusFilter, setStatusFilter] =
        useState<LeadStatus | "All">("All");

    const [selectedLead, setSelectedLead] =
        useState<Lead | null>(null);

    return (
        <div className="p-6 space-y-6">
            {loading && (
                <div className="text-sm text-muted-foreground">
                    Loading dashboard...
                </div>
            )}

            {error && (
                <div className="text-sm text-red-500">
                    {error}
                </div>
            )}

            {!loading && !error && (
                <>
                    <div className="flex justify-between items-center">
                        <TopBar title="Dashboard" />
                        <Button onClick={() => setOpen(true)}>Add Lead</Button>
                    </div>

                    <KpiCards leads={leads} />

                    <LeadTable
                        data={leads}
                        statusFilter={statusFilter}
                        onStatusFilterChange={setStatusFilter}
                        onRowClick={setSelectedLead}
                    />

                    <LeadDetailsDrawer
                        lead={selectedLead}
                        onClose={() => setSelectedLead(null)}
                        onStatusChange={updateStatus}
                    />

                    <CreateLeadModal
                        open={Open}
                        onClose={() => setOpen(false)}
                        onCreate={createLead}
                    />
                </>
            )}
        </div>
    );
}
