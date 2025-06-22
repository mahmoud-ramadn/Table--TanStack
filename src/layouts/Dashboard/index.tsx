
import { Outlet } from "react-router"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

import DashboardSidebar from "@/components/dashboard-sidebar"

export default function DashboardLayout() {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main className="grow  bg-three"  >
                <header className="p-6 flex items-center justify-between">
                    <SidebarTrigger />
                </header>
                <Outlet />
            </main>
        </SidebarProvider>
    )
}
