import type { ColumnDef } from "@tanstack/react-table"
import { MoreVerticalIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import DataTable from "@/components/ui/data-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { useDummyPosts } from "@/queries/dummy"

export default function Index() {
    const columns: ColumnDef<Post>[] = [
        {
            accessorKey: "id",
            header: "#",
        },
        {
            accessorKey:"content",
            header: "العنوان",
        },
        {
            accessorKey: "content",
            header: "المحتوى",
        },
        {
            id: "actions",
            header: "الإجراءات",
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

    const { data: posts = [], isLoading } = useDummyPosts()

    return (
        <div className="container  py-10">
            <DataTable columns={columns} data={posts} loading={isLoading} totalPages={10} />
        </div>
    )
}
