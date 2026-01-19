import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

import { Lead, LeadStatus } from "../../../types/lead";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../components/ui/table";

interface LeadTableProps {
    data: Lead[];
    statusFilter: LeadStatus | "All";
    onStatusFilterChange: (value: LeadStatus | "All") => void;
    onRowClick?: (lead: Lead) => void;
}

export function LeadTable({
    data,
    statusFilter,
    onStatusFilterChange,
    onRowClick,
}: LeadTableProps) {
    const [sorting, setSorting] = useState<SortingState>([]);

    // Memoized filtered data
    const filteredData = useMemo(() => {
        if (statusFilter === "All") return data;
        return data.filter((lead) => lead.status === statusFilter);
    }, [data, statusFilter]);

    // Memoized columns
    const columns = useMemo<ColumnDef<Lead>[]>(() => [
        {
            accessorKey: "name",
            header: "Lead Name",
             enableSorting: false,
        },
        {
            accessorKey: "email",
            header: "Email",
             enableSorting: false,
        },
        {
            accessorKey: "phone",
            header: "Phone",
             enableSorting: false,
        },
        {
            accessorKey: "status",
            header: "Status",
             enableSorting: false,
        },
        {
            accessorKey: "assignedAgent",
            header: "Assigned Agent",
             enableSorting: false,
        },
        {
            accessorKey: "createdAt",
            header: "Created Date",
            enableSorting: true,
            sortingFn: (rowA, rowB) => {
                const a = new Date(rowA.original.createdAt).getTime();
                const b = new Date(rowB.original.createdAt).getTime();
                return a - b;
            },
            cell: ({ getValue }) =>
                new Date(getValue<string>()).toLocaleDateString(),
        },
    ], []);

    const table = useReactTable({
        data: filteredData,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="rounded border p-4 space-y-4">
            <select
                value={statusFilter}
                onChange={(e) =>
                    onStatusFilterChange(e.target.value as LeadStatus | "All")
                }
                className="h-10 w-48 rounded-md border px-3 text-sm"
            >
                <option value="All">All</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Lost">Lost</option>
            </select>

            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((hg) => (
                        <TableRow key={hg.id}>
                            {hg.headers.map((header) => (
                                <TableHead
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    className="cursor-pointer select-none"
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                    {header.column.getIsSorted() === "asc" && " 🔼 "}
                                    {header.column.getIsSorted() === "desc" && " 🔽 "}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {table.getRowModel().rows.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="text-center py-6">
                                No leads found
                            </TableCell>
                        </TableRow>
                    ) : (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                className="cursor-pointer hover:bg-muted"
                                onClick={() => onRowClick?.(row.original)}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            <div className="flex justify-between items-center">
                <span className="text-sm">
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                </span>

                <div className="space-x-2">
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="border px-3 py-1 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="border px-3 py-1 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
