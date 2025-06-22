import type { ColumnDef } from "@tanstack/react-table"
import { MoreVerticalIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "status",
        header: () => <div>الحالة</div>,
        cell: ({ row }) => {
            const Status = row.getValue("status") as string
            return <div>{Status}</div>
        },
    },
    {
        accessorKey: "amount",
        header: () => <div>المبلغ</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("ar-EG", {
                style: "currency",
                currency: "EGP",
            }).format(amount)
            return <div>{formatted}</div>
        },
    },
    {
        accessorKey: "email",
        header: () => <div>البريد الإلكتروني</div>,
    },
    {
        id: "actions",
        cell: () => {
            return (
                <DropdownMenu dir="rtl">
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0  focus:ring-3 focus:ring-primary/35">
                            <MoreVerticalIcon className="size-6" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>عرض</DropdownMenuItem>
                        <DropdownMenuItem>تعديل</DropdownMenuItem>
                        <DropdownMenuItem>حذف</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },

]
