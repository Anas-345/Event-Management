import { useState } from "react"
import { NavLink } from "react-router"
import useAuth from "@/hooks/useAuth"
import useLogout from "@/hooks/useLogout"
import { CalendarDays, ChevronLeft, LayoutDashboard, LogOut, Settings } from "lucide-react"

const NAV_ITEMS = [
    {
        label: "Dashboard",
        to: "/dashboard",
        icon: LayoutDashboard,
    },
]

const BOTTOM_ITEMS = [
    {
        label: "Settings",
        to: "/dashboard/settings",
        icon: Settings,
    },
]

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false)
    const { data } = useAuth()

    const { mutate } = useLogout()

    const user = data?.data

    return (
        <aside
            className={`
                relative flex h-full flex-col border-r border-black/10 bg-accent
                transition-all duration-300 ease-in-out
                dark:border-white/5 dark:bg-accent
                ${collapsed ? "w-16" : "w-55"}
            `}
        >
            <div className={`flex h-16 shrink-0 items-center border-b border-black/10 dark:border-white/5 ${collapsed ? "justify-center px-0" : "gap-2.5 px-4"}`}>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-white shadow-sm shadow-primary/25">
                    <CalendarDays className="h-4 w-4" aria-hidden="true" />
                </span>
                {!collapsed && (
                    <span className="text-sm font-semibold tracking-tight text-foreground">
                        EventFlow
                    </span>
                )}
            </div>

            <button
                onClick={() => setCollapsed((c) => !c)}
                className={`
                    absolute -right-3 top-18 z-10
                    flex h-6 w-6 items-center justify-center
                    rounded-full border border-black/10 bg-surface text-text-secondary
                    shadow-sm transition-colors hover:bg-accent hover:text-foreground
                    dark:border-white/10 dark:bg-surface
                `}
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
                <ChevronLeft
                    className={`h-3.5 w-3.5 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
                    aria-hidden="true"
                />
            </button>

            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto overflow-x-hidden p-2 pt-3" aria-label="Sidebar navigation">
                {NAV_ITEMS.map(({ label, to, icon: Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end
                        className={({ isActive }) => `
                            group flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium
                            transition-colors duration-150
                            ${isActive
                                ? "bg-primary/10 text-primary dark:bg-primary/15"
                                : "text-text-secondary hover:bg-black/5 hover:text-foreground dark:hover:bg-white/5"
                            }
                            ${collapsed ? "justify-center" : ""}
                        `}
                        title={collapsed ? label : undefined}
                    >
                        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                        {!collapsed && <span>{label}</span>}
                    </NavLink>
                ))}
            </nav>

            <div className="flex flex-col gap-1 border-t border-black/10 p-2 pt-3 dark:border-white/5">
                {BOTTOM_ITEMS.map(({ label, to, icon: Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) => `
                            group flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium
                            transition-colors duration-150
                            ${isActive
                                ? "bg-primary/10 text-primary dark:bg-primary/15"
                                : "text-text-secondary hover:bg-black/5 hover:text-foreground dark:hover:bg-white/5"
                            }
                            ${collapsed ? "justify-center" : ""}
                        `}
                        title={collapsed ? label : undefined}
                    >
                        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                        {!collapsed && <span>{label}</span>}
                    </NavLink>
                ))}

                <button
                    className={`
                        flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium
                        text-text-secondary transition-colors duration-150
                        hover:bg-danger/10 hover:text-danger
                        ${collapsed ? "justify-center" : ""}
                    `}
                    title={collapsed ? "Sign out" : undefined}
                    aria-label="Sign out"
                    onClick={mutate}
                >
                    <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {!collapsed && <span>Sign out</span>}
                </button>

                {!collapsed && (
                    <div className="mt-1 flex items-center gap-2.5 rounded-lg border border-black/8 bg-surface px-2.5 py-2 dark:border-white/8">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                            {user?.firstName[0].toUpperCase() + user?.lastName[0].toUpperCase()}
                        </span>
                        <div className="min-w-0">
                            <p className="truncate text-xs font-medium text-foreground">{user?.firstName + " " + user?.lastName}</p>
                            <p className="truncate text-[11px] text-text-secondary">{user?.role.toUpperCase()}</p>
                        </div>
                    </div>
                )}
            </div>
        </aside>
    )
}
