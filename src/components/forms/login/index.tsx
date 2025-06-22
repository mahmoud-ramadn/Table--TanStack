import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import logo from "@/assets/images/logo.svg"
import { type LoginFormSchema, loginFormSchema } from "@/components/forms/login/schema"

type Props = {
    className?: string
}

export default function LoginForm({ className }: Readonly<Props>) {
    const form = useForm<LoginFormSchema>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(values: LoginFormSchema) {
        // eslint-disable-next-line no-console
        console.log(values)
    }

    return (
        <div className={cn("sm:w-[500px] w-full container", className)}>
            <div className="border rounded-2xl px-5 py-8 border-border">
                <img src={logo} alt="logo" className="size-28 mx-auto block" />
                <h1 className="text-2xl font-semibold text-center mt-5">تسجيل الدخول</h1>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>البريد الإلكتروني</FormLabel>
                                    <FormControl>
                                        <Input placeholder="البريد الإلكتروني" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>كلمة المرور</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="كلمة المرور" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" size="lg">
                            تسجيل الدخول
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
