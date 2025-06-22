import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { useCreateCustomers } from "@/actions/addCutomer"
import { type AddCustomerFormSchema, addCustomerFormSchema } from "@/components/forms/add-customer/schema"

type Props = {
    className?: string
}

export default function AddCustomerForm({ className }: Readonly<Props>) {
    const { mutate, isPending } = useCreateCustomers()
    const form = useForm<AddCustomerFormSchema>({
        resolver: zodResolver(addCustomerFormSchema),
        defaultValues: {
            customer: "",
            company: "",
            phoneName: 0,
            email: "",
            count: 0,
            status: false,
        },
    })

    function onSubmit(values: AddCustomerFormSchema) {
        mutate(values as unknown as Customer[])
    }

    return (
        <div className={cn("sm:w-[500px] w-full container", className)}>
            <div className="border rounded-2xl px-5 py-8 border-border">
                <h1 className="text-2xl font-semibold text-center mt-5">Add Customer</h1>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
                        <FormField
                            control={form.control}
                            name="customer"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Customer Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Customer Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Company Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phoneName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Phone Number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="count"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Count</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Count" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Status</FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <Button type="submit" size="lg">
                            {isPending ? "loading" : "add cutomer"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
