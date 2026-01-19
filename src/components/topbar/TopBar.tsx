import { Button } from "@/components/ui/button";

interface TopBarProps {
    title: string;
    onAddLead?: () => void;
}

export function TopBar({ title, onAddLead }: TopBarProps) {
    return (
        <div className="flex items-center justify-between border-b pb-4">
            <h1 className="text-2xl font-semibold">{title}</h1>

            {onAddLead && (
                <Button onClick={onAddLead}>
                    Add Lead
                </Button>
            )}
        </div>
    );
}
