import { apiClient } from "@/lib/api-client";

export const dummyCustomers = async () => {
    const response = await apiClient<Customer[]>({
        method: "GET",
        url: "http://localhost:3001/customers",
    })

    return response
}