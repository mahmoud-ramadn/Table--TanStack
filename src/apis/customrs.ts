import { apiClient } from "@/lib/api-client"

export const dummyCustomers = async () => {
    const response = await apiClient<Customer[]>({
        method: "GET",
        url: "http://localhost:3001/customers",
    })

    return response
}

export const getCustomerById = async (id: number) => {
    const response = await apiClient<Customer>({
        method: "GET",
        url: `http://localhost:3001/customers/${id}`,
    })
    return response
}

export const updateCustomer = async (id: number, data: Partial<Customer>) => {
    const response = await apiClient({
        method: "PUT",
        url: `http://localhost:3001/customers/${id}`,
        body: data,
    })
    return response
}
