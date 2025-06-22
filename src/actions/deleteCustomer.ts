import { useMutation, useQueryClient } from "@tanstack/react-query"

import { deleteCustomer } from "@/apis/deleteCustomer"
import { CUSTOMERS_QUERY_KEY } from "@/queries/customers"

export const useDeleteCustomer = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteCustomer,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [CUSTOMERS_QUERY_KEY],
            })
        },
    })
}
