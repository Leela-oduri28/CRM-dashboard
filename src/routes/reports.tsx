import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/reports")({
  component: () => (
    <div className="p-6 text-muted-foreground">
      Reports page (Coming soon)
    </div>
  ),
});
