import { useQuery } from "@tanstack/react-query"

import { dummyCustomers, getCustomerById } from "@/apis/customrs"

export const CUSTOMERS_QUERY_KEY = "customers"

export const useGetCustomers = () => {
    return useQuery({
        queryKey: [CUSTOMERS_QUERY_KEY],
        queryFn: async () => {
            const response = await dummyCustomers()
            return response
        },
    })
}

export const useGetCustomerById = (id: number) => {
    return useQuery({
        queryKey: [CUSTOMERS_QUERY_KEY, id],
        queryFn: () => getCustomerById(id),
        enabled: !!id,
    })
}
