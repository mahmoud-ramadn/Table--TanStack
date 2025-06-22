import { apiClient } from "@/lib/api-client"

export const deleteCustomer = async (id: number) => {
    const response = await apiClient({
        method: "DELETE",
        url: `http://localhost:3001/customers/${id}`,
    })

    return response
}
