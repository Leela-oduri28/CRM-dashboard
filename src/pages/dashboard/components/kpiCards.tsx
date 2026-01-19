import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lead } from "@/types/lead";
import { useMemo } from "react";

interface KpiCardsProps {
    leads: Lead[];
}

export function KpiCards({ leads }: KpiCardsProps) {
    const stats = useMemo(() => {
        const total = leads.length;
        const newLeads = leads.filter(l => l.status === "New").length;
        const qualified = leads.filter(l => l.status === "Qualified").length;
        const lost = leads.filter(l => l.status === "Lost").length;

        return [
            { label: "Total Leads", value: total },
            { label: "New Leads", value: newLeads },
            { label: "Qualified", value: qualified },
            { label: "Lost", value: lost },
        ];
    }, [leads]);

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(stat => (
                <Card key={stat.label}>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-muted-foreground">
                            {stat.label}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
