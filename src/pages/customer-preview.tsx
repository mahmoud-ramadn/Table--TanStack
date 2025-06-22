import {  useParams } from "react-router-dom";
import { useGetCustomerById } from "@/queries/customers";
// import { Loader } from "@/components/ui/loader";

export default function CustomerPreview() {
    const params = useParams();
    const customerId = Number(params.id);
    const { data , isLoading, error } = useGetCustomerById(customerId);
    if (isLoading) return <div className="flex justify-center items-center h-64">  </div>;
    if (error) return <div className="text-red-500">حدث خطأ أثناء جلب بيانات العميل.</div>;
    if (!data) return <div>لا يوجد بيانات لهذا العميل.</div>;

    return (
        <div className="max-w-lg mx-auto mt-10 bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold mb-4">بيانات العميل</h2>
            <div className="space-y-2">
                <div><span className="font-semibold">الاسم:</span> {data.id}</div>
                <div><span className="font-semibold">الشركة:</span> {data.company}</div>
                <div><span className="font-semibold">رقم الهاتف:</span> {data.phoneName}</div>
                <div><span className="font-semibold">البريد الإلكتروني:</span> {data.email}</div>
                <div><span className="font-semibold">العدد:</span> {data.count}</div>
                <div><span className="font-semibold">الحالة:</span> {data.status}</div>
            </div>
        </div>
    );
} 