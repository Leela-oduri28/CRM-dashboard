import { Link } from "@tanstack/react-router";

export function Sidebar() {
    return (
        <aside className="w-64 border-r p-4">
            <h2 className="mb-6 text-xl font-semibold">Mini CRM</h2>

            <nav className="space-y-2">
                <Link
                    to="/"
                    className="block rounded px-3 py-2 hover:bg-muted"
                >
                    Dashboard
                </Link>

                <Link
                    to="/leads"
                    className="block rounded px-3 py-2 hover:bg-muted"
                >
                    Leads / Customers
                </Link>

                <Link
                    to="/reports"
                    className="block rounded px-3 py-2 hover:bg-muted"
                >
                    Reports
                </Link>
            </nav>
        </aside>
    );
}
