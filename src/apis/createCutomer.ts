import { apiClient } from "@/lib/api-client"

export const CreateCutomers = async (form: Customer[]) => {
    const response = await apiClient({
        method: "POST",
        url: "http://localhost:3001/customers",
        body: form, 
    })

    return response
}
