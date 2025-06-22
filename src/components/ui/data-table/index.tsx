import {
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { parseAsInteger } from "nuqs"
import { useQueryStates } from "nuqs"

import { useState } from "react"

import { cn } from "@/lib/utils"

import { DataTablePagination } from "@/components/ui/data-table/table-pagination"
import Loader from "@/components/ui/loader"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Props<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    loading?: boolean
    isStatic?: boolean
    totalPages?: number
}

export default function DataTable<TData, TValue>({
    columns,
    data,
    loading = false,
    isStatic = false,
    totalPages = 1,
}: Readonly<Props<TData, TValue>>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const defaultPagination = {
        page: parseAsInteger.withDefault(1),
        limit: parseAsInteger.withDefault(10),
    }

    const [pagination, setPagination] = useQueryStates(defaultPagination)

    const onUpdatePagination = (newPagination: Partial<PaginationQueryParams>) => {
        setPagination((prev) => {
            return {
                ...prev,
                ...newPagination,
            }
        })
    }

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            ...(!isStatic && {
                pagination: {
                    pageIndex: pagination.page - 1,
                    pageSize: pagination.limit,
                },
            }),
        },
        ...(totalPages &&
            !isStatic && {
            pageCount: totalPages,
        }),
    })

    const hasRows = Boolean(table.getRowModel().rows?.length)

    return (
        <>
            <ScrollArea className="pb-4 lg:max-w-full md:max-w-[520px]    max-w-[400px]  sm:max-w-[750px]  lg:mx-0 mx-auto">
                <Table >
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="py-4">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className="relative">
                        {hasRows &&
                            table.getRowModel().rows.map((row, index) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className={cn(index === table.getRowModel().rows.length - 1 && "border-b-0")}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="py-4">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}

                        {loading && !hasRows && (
                            <TableRow className="h-24">
                                <TableCell colSpan={columns.length}>
                                    <Loader className="size-10 mx-auto" />
                                </TableCell>
                            </TableRow>
                        )}

                        {loading && hasRows && (
                            <div className="absolute inset-0 flex items-center justify-center bg-primary/20">
                                <Loader className="size-10" />
                            </div>
                        )}

                        {!loading && !hasRows && (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center text-lg font-semibold">
                                    لا يوجد نتائج
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <ScrollBar
                    orientation="horizontal"
                    className=" h-3"


                />
            </ScrollArea>

            <DataTablePagination
                className=" mt-4 "
                table={table}
                isStatic={isStatic}
                onUpdatePagination={onUpdatePagination}
                pagination={pagination}
            />
        </>
    )
}
