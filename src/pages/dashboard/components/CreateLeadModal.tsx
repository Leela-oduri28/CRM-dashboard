import { useState } from "react";
import { Lead, LeadStatus } from "../../../types/lead";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";

interface Props {
    open: boolean;
    onClose: () => void;
    onCreate: (lead: Omit<Lead, "id" | "createdAt">) => Promise<void>;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function CreateLeadModal({ open, onClose, onCreate }: Props) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        assignedAgent: "",
        status: "New" as LeadStatus,
    });

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        // Required field validation
        if (!form.name.trim() || !form.email.trim()) {
            setError("Name and Email are required");
            return;
        }

        // Email format validation 
        if (!EMAIL_REGEX.test(form.email)) {
            setError("Please enter a valid email address");
            return;
        }

        setSubmitting(true);
        setError(null);

        try {
            await onCreate(form); 
            onClose();

            // Reset form after success
            setForm({
                name: "",
                email: "",
                phone: "",
                assignedAgent: "",
                status: "New",
            });
        } catch (err: any) {
            // Duplicate email handling
            setError(err.message || "Failed to create lead");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Lead</DialogTitle>
                </DialogHeader>

                <div className="space-y-3">
                    <input
                        placeholder="Lead Name *"
                        className="w-full rounded border px-3 py-2"
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                    />

                    <input
                        placeholder="Email *"
                        className="w-full rounded border px-3 py-2"
                        value={form.email}
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                    />

                    <input
                        placeholder="Phone"
                        className="w-full rounded border px-3 py-2"
                        value={form.phone}
                        onChange={(e) =>
                            setForm({ ...form, phone: e.target.value })
                        }
                    />

                    <input
                        placeholder="Assigned Agent"
                        className="w-full rounded border px-3 py-2"
                        value={form.assignedAgent}
                        onChange={(e) =>
                            setForm({ ...form, assignedAgent: e.target.value })
                        }
                    />

                    <select
                        className="w-full rounded border px-3 py-2"
                        value={form.status}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                status: e.target.value as LeadStatus,
                            })
                        }
                    >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Lost">Lost</option>
                    </select>

                    {error && (
                        <p className="text-sm text-red-500">{error}</p>
                    )}

                    <Button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="w-full"
                    >
                        {submitting ? "Creating..." : "Create Lead"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
