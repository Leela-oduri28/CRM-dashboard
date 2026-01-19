import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/leads")({
  component: () => (
    <div className="p-6 text-muted-foreground">
      Leads page (Coming soon)
    </div>
  ),
});
