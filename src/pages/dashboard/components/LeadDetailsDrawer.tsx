import { useState } from "react";
import { Lead, LeadStatus } from "../../../types/lead";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../../components/ui/sheet";

interface LeadDetailsDrawerProps {
  lead: Lead | null;
  onClose: () => void;
  onStatusChange: (id: string, status: LeadStatus) => Promise<void>;
}

export function LeadDetailsDrawer({
  lead,
  onClose,
  onStatusChange,
}: LeadDetailsDrawerProps) {
  const [updating, setUpdating] = useState(false);

  if (!lead) return null;

  const handleStatusChange = async (value: LeadStatus) => {
    setUpdating(true);
    try {
      await onStatusChange(lead.id, value);
    } catch {
      alert("Failed to update status. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Sheet open={!!lead} onOpenChange={(open) => !open && onClose()} modal={false}>
      <SheetContent side="right" className="w-[400px]">
        <SheetHeader>
          <SheetTitle>{lead.name}</SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-4 text-sm">
          <div>
            <span className="font-medium">Email:</span> {lead.email}
          </div>

          <div>
            <span className="font-medium">Phone:</span> {lead.phone}
          </div>

          <div>
            <span className="font-medium">Assigned Agent:</span>{" "}
            {lead.assignedAgent}
          </div>

          <div>
            <span className="font-medium">Created:</span>{" "}
            {new Date(lead.createdAt).toLocaleString()}
          </div>

          <div>
            <span className="font-medium block mb-1">Status</span>
            <select
              value={lead.status}
              disabled={updating}
              onChange={(e) =>
                handleStatusChange(e.target.value as LeadStatus)
              }
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Lost">Lost</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="mb-2 text-sm font-semibold">Activity</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Lead created</li>
            <li>• Status updated</li>
            <li>• Agent assigned</li>
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}
