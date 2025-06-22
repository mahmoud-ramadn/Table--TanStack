import { lazy } from "react"
import type { RouteObject } from "react-router"

const Home = lazy(() => import("@/pages/index.tsx"))
const AddCustomer = lazy(() => import("@/pages/addCutomer.tsx"))
const DashboardLayout = lazy(() => import("@/layouts/Dashboard"))

export const DashboardRoutes: RouteObject = {
    path: "",
    Component: DashboardLayout,
    children: [
        {
            path: "",
            index: true,
            Component: Home,
        },
        {
            path: "add-customer",
            Component: AddCustomer,
        },
    ],
}
