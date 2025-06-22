import { lazy } from "react"
import type { RouteObject } from "react-router-dom"

const CustomDashboard = lazy(() => import("@/pages/dahabord"))
const CustomerPreview = lazy(() => import("@/pages/customer-preview"))
const CustomerEdit = lazy(() => import("@/pages/customer-edit"))
const DashboardLayout = lazy(() => import("@/layouts/Dashboard"))

export const MyCustomDahboradRoute: RouteObject = {
    path: "",
    Component: DashboardLayout,
    children: [
        {
            path: "/dashbord",
            Component: CustomDashboard,
        },
        {
            path: "/customer/:id",
            Component: CustomerPreview,
        },
        {
            path: "/customer/:id/edit",
            Component: CustomerEdit,
        },
    ],
}
