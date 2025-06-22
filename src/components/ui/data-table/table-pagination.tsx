import type { Table } from "@tanstack/react-table"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

import { useMemo } from "react"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Props<TData> = {
    table: Table<TData>
    className?: string
    isStatic?: boolean
    onUpdatePagination: (newPagination: Partial<PaginationQueryParams>) => void
    pagination: PaginationQueryParams
}

export function DataTablePagination<TData>({
    table,
    className,
    isStatic = false,
    onUpdatePagination,
    pagination,
}: Readonly<Props<TData>>) {
    const handlePageChange = (newPageIndex: number) => {
        if (isStatic) {
            table.setPageIndex(newPageIndex)
            return
        }

        onUpdatePagination({
            page: newPageIndex + 1,
        })
    }

    const handlePageSizeChange = (newPageSize: number) => {
        if (isStatic) {
            table.setPageSize(newPageSize)
            table.setPageIndex(0)
            return
        }

        onUpdatePagination({
            limit: newPageSize,
        })
    }
    const limitValue = useMemo(() => {
        return isStatic ? pagination.limit.toString() : table.getState().pagination.pageSize.toString()
    }, [pagination.limit, isStatic, table])

    return (
        <div className={cn("flex items-center mt-2   ", className)}>
            <div className="flex items-center gap-x-6  lg:mx-0 mx-auto">
                <div className="flex items-center justify-center font-medium shrink-0">
                    الصفحة {table.getState().pagination.pageIndex + 1} من {table.getPageCount()}
                </div>
                <div className="flex items-center gap-x-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="size-10"
                        onClick={() => handlePageChange(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">الصفحة الأولى</span>
                        <ChevronsRight className="size-5" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="size-10"
                        onClick={() => handlePageChange(table.getState().pagination.pageIndex - 1)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">الصفحة السابقة</span>
                        <ChevronRight className="size-5" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="size-10"
                        onClick={() => handlePageChange(table.getState().pagination.pageIndex + 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">الصفحة التالية</span>
                        <ChevronLeft className="size-5" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="size-10"
                        onClick={() => handlePageChange(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">الصفحة الأخيرة</span>
                        <ChevronsLeft className="size-5" />
                    </Button>
                </div>

                <Select
                    value={limitValue}
                    onValueChange={(value) => {
                        handlePageSizeChange(Number(value))
                    }}
                >
                    <SelectTrigger className="w-20 data-[size=default]:h-10 focus:ring-3 focus:ring-primary/35">
                        <SelectValue placeholder={limitValue} />
                    </SelectTrigger>
                    <SelectContent side="top" className="border  ">
                        {[5, 10, 15, 20, 25].map((pageSize) => (
                            <SelectItem key={pageSize} value={`${pageSize}`}>
                                {pageSize}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
