import { CreateCutomers } from "@/apis/createCutomer"
import { CUSTOMERS_QUERY_KEY } from "@/queries/customers"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateCustomers = () => {
    const queryClient = useQueryClient()

    return useMutation({
       mutationFn:CreateCutomers ,
       onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: [CUSTOMERS_QUERY_KEY] 
      });
    },
    })
}
