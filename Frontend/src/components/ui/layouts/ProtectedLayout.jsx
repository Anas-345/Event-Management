import useAuth from "@/hooks/useAuth"
import { Navigate, Outlet } from "react-router"
import Sidebar from "../Sidebar"

export default function ProtectedLayout() {
    const { data } = useAuth()

    const user = data?.data

    if (!user) return <Navigate to="/auth/login" replace />

    return (
        <div className="flex h-screen overflow-hidden bg-background">

            <Sidebar />

            <div className="flex flex-1 flex-col overflow-hidden">
                <header className="flex h-16 shrink-0 items-center justify-between border-b border-black/10 bg-surface px-6 dark:border-white/5 dark:bg-surface">
                    <div>
                        <h1 className="text-sm font-semibold text-foreground">Dashboard</h1>
                        <p className="text-xs text-text-secondary">Welcome back, {user?.role ?? "user"}</p>
                    </div>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white shadow-sm shadow-primary/25">
                        {user?.firstName[0].toUpperCase() + user?.lastName[0].toUpperCase()}
                    </span>
                </header>

                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
