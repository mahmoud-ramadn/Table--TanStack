import { apiClient } from "@/lib/api-client"

export const dummyCustomers = async () => {
    const response = await apiClient<Customer[]>({
        method: "GET",
        url: "https://vue-project-kka9.vercel.app/customers",
    })

    return response
}

export const getCustomerById = async (id: number) => {
    const response = await apiClient<Customer>({
        method: "GET",
        url: `https://vue-project-kka9.vercel.app/customers/${id}`,
    })
    return response
}

export const updateCustomer = async (id: number, data: Partial<Customer>) => {
    const response = await apiClient({
        method: "PUT",
        url: `https://vue-project-kka9.vercel.app/customers/${id}`,
        body: data,
    })
    return response
}
