import type { ColumnDef } from "@tanstack/react-table"

import DataTable from "@/components/ui/data-table"

import { useGetCustomers } from "@/queries/customers"

export default function dahabord() {

    const columns: ColumnDef<Customer>[] = [
        {
            accessorKey:"customer",
            header: "Customer Name",
        },
        {
            accessorKey:"company",
            header: "Company",
        },
        {
            accessorKey: "phoneName",
            header: "Phone Number",
        },
        {
        accessorKey:'email',
            header: "Email",
        },
        {
        accessorKey: "count",
            header: "count",
        },
        {
        accessorKey:'status',
            header: "Status",
        },
    ]

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {data: Customer=[],isLoading }= useGetCustomers()

  return (
    <div className=" container  ">

          <DataTable columns={columns} data={Customer} loading={isLoading} totalPages={10} />


    </div>
  )
}
