import { lazy } from "react"
import { createBrowserRouter } from "react-router"

import Layout from "@/layouts"
import { AuthRoutes } from "@/routes/auth"
import { DashboardRoutes } from "@/routes/dashboard"
import { MyCustomDahboradRoute } from "@/routes/my-custom-dashbord"
import { AddingCutomers } from "./add-cutomers"

const NotFound = lazy(() => import("@/pages/not-found"))

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        children: [
            DashboardRoutes,
            AuthRoutes,
            MyCustomDahboradRoute,
            AddingCutomers,
            {
                path: "*",
                Component: NotFound,
            },
        ],
    },
])
