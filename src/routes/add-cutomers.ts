import { lazy } from "react"
import type { RouteObject } from "react-router"

const CreatCutomers = lazy(() => import("@/pages/addCutomer"))
const DashboardLayout = lazy(() => import("@/layouts/Dashboard"))

export const AddingCutomers: RouteObject = {
    path: "",
    Component: DashboardLayout,
    children: [
        {
            path: "/addCutomer",
            Component:CreatCutomers,
        },
    ],
}
