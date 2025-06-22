import { useParams, useNavigate } from "react-router-dom";
import { useGetCustomerById } from "@/queries/customers";
import { useUpdateCustomer } from "@/actions/updateCustomer";
import { useState, useEffect } from "react";

export default function CustomerEdit() {
    const params = useParams();
    const customerId = Number(params.id);
    const { data: customer, isLoading, error } = useGetCustomerById(customerId);
    const { mutate: updateCustomer, isPending: isSaving } = useUpdateCustomer();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        customer: customer?.customer || "",
        company: customer?.company || "",
        phoneName: customer?.phoneName || "",
        email: customer?.email || "",
        count: customer?.count || 0,
        status: customer?.status || "",
    });

    // Update form when customer data loads
    useEffect(() => {
        if (customer) {
            setForm({
                customer: customer.customer,
                company: customer.company,
                phoneName: customer.phoneName,
                email: customer.email,
                count: customer.count,
                status: customer.status,
            });
        }
    }, [customer]);

    if (isLoading) return <div className="flex justify-center items-center h-64"> loading</div>;
    if (error) return <div className="text-red-500">حدث خطأ أثناء جلب بيانات العميل.</div>;
    if (!customer) return <div>لا يوجد بيانات لهذا العميل.</div>;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateCustomer({ id: customerId, data: form }, {
            onSuccess: () => navigate(-1),
        });
    };

    return (
        <div className="max-w-lg mx-auto mt-10 bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold mb-4">تعديل بيانات العميل</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block font-semibold mb-1">الاسم</label>
                    <input name="customer" value={form.customer} onChange={handleChange} className="w-full border rounded p-2" required />
                </div>
                <div>
                    <label className="block font-semibold mb-1">الشركة</label>
                    <input name="company" value={form.company} onChange={handleChange} className="w-full border rounded p-2" required />
                </div>
                <div>
                    <label className="block font-semibold mb-1">رقم الهاتف</label>
                    <input name="phoneName" value={form.phoneName} onChange={handleChange} className="w-full border rounded p-2" required />
                </div>
                <div>
                    <label className="block font-semibold mb-1">البريد الإلكتروني</label>
                    <input name="email" value={form.email} onChange={handleChange} className="w-full border rounded p-2" required />
                </div>
                <div>
                    <label className="block font-semibold mb-1">العدد</label>
                    <input name="count" type="number" value={form.count} onChange={handleChange} className="w-full border rounded p-2" required />
                </div>
                <div>
                    <label className="block font-semibold mb-1">الحالة</label>
                    <input name="status" value={form.status} onChange={handleChange} className="w-full border rounded p-2" required />
                </div>
                <button type="submit" className="bg-primary text-white px-4 py-2 rounded" disabled={isSaving}>
                    {isSaving ? "جاري الحفظ..." : "حفظ التعديلات"}
                </button>
            </form>
        </div>
    );
} 