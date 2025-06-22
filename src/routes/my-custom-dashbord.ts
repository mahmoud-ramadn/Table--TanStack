import { lazy } from "react"
import type { RouteObject } from "react-router"

const customDahbord = lazy(() => import("@/pages/dahabord"))
const DashboardLayout = lazy(() => import("@/layouts/Dashboard"))

export const MyCustomDahboradRoute: RouteObject = {
    path: "",
    Component: DashboardLayout,
    children: [
        {
            path: "/dashbord",
            Component:customDahbord,
        },
    ],
}
