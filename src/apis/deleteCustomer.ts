import { apiClient } from "@/lib/api-client";





export const deleteCustomer = async (id: number) => {
    const response = await apiClient({
        method: "DELETE",
        url: `https://vue-project-kka9.vercel.app/customers/${id}`,
    })

    return response
}