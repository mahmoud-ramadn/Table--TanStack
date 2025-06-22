import { NuqsAdapter } from "nuqs/adapters/react"

import { Suspense } from "react"
import { Outlet } from "react-router"

import GlobalFallback from "@/components/ui/global-fallback"

import { TanstackProvider } from "@/components/global-provider/tanstack-provider"

export default function Layout() {
    return (
        <NuqsAdapter>
            <TanstackProvider>
                <Suspense fallback={<GlobalFallback />}>
                    <div className="min-h-screen overflow-x-hidden  ">
                        <Outlet />
                    </div>
                </Suspense>
            </TanstackProvider>
        </NuqsAdapter>
    )
}
