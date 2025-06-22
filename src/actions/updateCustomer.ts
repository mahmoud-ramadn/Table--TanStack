import { useMutation, useQueryClient } from "@tanstack/react-query"

import { updateCustomer } from "@/apis/customrs"
import { CUSTOMERS_QUERY_KEY } from "@/queries/customers"

export const useUpdateCustomer = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<Customer> }) => updateCustomer(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CUSTOMERS_QUERY_KEY] })
        },
    })
}
