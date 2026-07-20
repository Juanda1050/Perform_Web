import { Outlet } from 'react-router-dom'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { AppTopbar } from '@/components/layout/app-topbar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { useUiStore } from '@/store/ui-store'

export function DashboardLayout() {
  const isSidebarOpen = useUiStore((state) => state.isSidebarOpen)
  const toggleSidebar = useUiStore((state) => state.toggleSidebar)

  return (
    <SidebarProvider open={isSidebarOpen} onOpenChange={toggleSidebar}>
      <AppSidebar />
      <SidebarInset>
        <AppTopbar />
        <main className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
