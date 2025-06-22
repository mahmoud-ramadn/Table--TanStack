import { apiClient } from "@/lib/api-client";





export const CreateCutomers = async (form: Customer[]) => {
    const response = await apiClient({
        method: "POST",
        url: "https://vue-project-kka9.vercel.app/customers",
        body: form,
    })

    return response
}