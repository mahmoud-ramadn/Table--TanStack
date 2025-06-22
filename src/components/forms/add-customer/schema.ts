import { z } from "zod"

export const addCustomerFormSchema = z.object({
    customer: z.string().min(1, { message: "Customer name is required" }),
    company: z.string().min(1, { message: "Company name is required" }),
    phoneName: z.coerce.number().min(1, { message: "Phone number is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    count: z.coerce.number().min(0, { message: "Count must be a positive number" }),
    status: z.boolean(),
})

export type AddCustomerFormSchema = z.infer<typeof addCustomerFormSchema>
