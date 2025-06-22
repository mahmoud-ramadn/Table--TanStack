import type { ColumnDef } from "@tanstack/react-table"

import DataTable from "@/components/ui/data-table"

import { useGetCustomers } from "@/queries/customers"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenu } from "@radix-ui/react-dropdown-menu"
import { MoreVerticalIcon, Eye, Pencil, Delete } from "lucide-react"
import { useDeleteCustomer } from "@/actions/deleteCustomer"
import { useNavigate } from "react-router-dom"

export default function Dahabord() {
    const { mutate: deleteCustomer } = useDeleteCustomer()
    const navigate = useNavigate()

    const columns: ColumnDef<Customer>[] = [
        {
            accessorKey: "id",
            header: "#",
        },
        {
            accessorKey: "customer",
            header: "Customer Name",
        },
        {
            accessorKey: "company",
            header: "Company",
        },
        {
            accessorKey: "phoneName",
            header: "Phone Number",
        },
        {
            accessorKey: 'email',
            header: "Email",
        },
        {
            accessorKey: "count",
            header: "count",
        },
        {
            accessorKey: 'status',
            header: "Status",
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => {
                return (
                    <DropdownMenu  >
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0  focus:ring-3 focus:ring-primary/35">
                                <MoreVerticalIcon className="size-6" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className=" w-[220px] bg-white rounded-4">
                            <DropdownMenuItem
                                className=" flex justify-between    cursor-pointer hover:bg-primary/20 items-center p-2"
                                onClick={() => navigate(`/customer/${row.original.id}`)}
                            >
                                <Eye className="size-4 mr-2" /> عرض
                            </DropdownMenuItem >
                            <DropdownMenuItem
                                className=" flex justify-between   cursor-pointer hover:bg-primary/20  items-center p-2"
                                onClick={() => navigate(`/customer/${row.original.id}/edit`)}
                            >
                                <Pencil className="size-4 mr-2" /> تعديل
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className=" flex justify-between    cursor-pointer hover:bg-primary/20 items-center p-2"
                                onClick={() => deleteCustomer(row.original.id)}
                            >
                                <Delete className="size-4 mr-2 text-destructive" /> حذف
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            }
        }
    ]

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: Customer = [], isLoading } = useGetCustomers()

    return (
        <div className=" container  ">

            <DataTable columns={columns} data={Customer} loading={isLoading} totalPages={10} />


        </div>
    )
}
