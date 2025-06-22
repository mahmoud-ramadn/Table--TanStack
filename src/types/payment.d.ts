type Payment = {
    id: string
    amount: number
    status: "قيد الانتظار" | "جارٍ التنفيذ" | "ناجحة" | "فشلت"
    email: string
}
