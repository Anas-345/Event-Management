import useAuth from "@/hooks/useAuth"
import useLogout from "@/hooks/useLogout"
import { useQueryClient } from "@tanstack/react-query"
import { CalendarDays, Menu, X } from "lucide-react"
import { useState } from "react"
import { NavLink } from "react-router"

const NAV_LINKS = [
    { label: "Home", to: "/" },
    { label: "Events", to: "/events" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
]

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const queryClient = useQueryClient()
    const { mutate } = useLogout()

    const data = queryClient.getQueryData(['authState'])
    const user = data?.data

    return (
        <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-accent/80 backdrop-blur-md dark:border-white/5 dark:bg-accent/70">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                <NavLink
                    to="/"
                    className="flex items-center gap-2.5 select-none"
                    aria-label="EventFlow home"
                >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white shadow-sm shadow-primary/30">
                        <CalendarDays className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="text-base font-semibold tracking-tight text-foreground">
                        EventFlow
                    </span>
                </NavLink>

                <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
                    {NAV_LINKS.map(({ label, to }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === "/"}
                            className={({ isActive }) =>
                                `rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${isActive
                                    ? "bg-accent text-foreground"
                                    : "text-text-secondary hover:bg-accent hover:text-foreground"
                                }`
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                </nav>

                {
                    user ?
                        <div className="hidden items-center gap-2 md:flex">
                            <button
                                className="rounded-lg bg-danger px-4 py-1.5 text-sm font-semibold text-white shadow-sm shadow-primary/20 transition hover:bg-red-700"
                                onClick={mutate}
                            >
                                Logout
                            </button>
                        </div>
                        :
                        <div className="hidden items-center gap-2 md:flex">
                            <NavLink
                                to="/auth/login"
                                className="rounded-lg border border-black/8 bg-transparent px-4 py-1.5 text-sm font-medium text-foreground transition hover:bg-accent dark:border-white/10"
                            >
                                Sign in
                            </NavLink>
                            <NavLink
                                to="/auth/register"
                                className="rounded-lg bg-primary px-4 py-1.5 text-sm font-semibold text-white shadow-sm shadow-primary/20 transition hover:bg-primary-hover"
                            >
                                Get started
                            </NavLink>
                        </div>
                }

                <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary hover:bg-accent hover:text-foreground transition md:hidden"
                    onClick={() => setMobileOpen((o) => !o)}
                    aria-expanded={mobileOpen}
                    aria-label={mobileOpen ? "Close menu" : "Open menu"}
                >
                    {mobileOpen ? (
                        <X className="h-5 w-5" aria-hidden="true" />
                    ) : (
                        <Menu className="h-5 w-5" aria-hidden="true" />
                    )}
                </button>
            </div>

            {mobileOpen && (
                <div className="border-t border-black/10 bg-accent px-4 pb-4 pt-2 md:hidden dark:border-white/5 dark:bg-accent">
                    <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                        {NAV_LINKS.map(({ label, to }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={to === "/"}
                                onClick={() => setMobileOpen(false)}
                                className={({ isActive }) =>
                                    `rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive
                                        ? "bg-accent text-foreground"
                                        : "text-text-secondary hover:bg-accent hover:text-foreground"
                                    }`
                                }
                            >
                                {label}
                            </NavLink>
                        ))}
                    </nav>

                    {
                        user ?
                            <button
                                onClick={mutate}
                                className="rounded-lg bg-danger px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-primary-hover"
                            >
                                Logout
                            </button>
                            :
                            <div className="mt-3 flex flex-col gap-2 border-t border-black/5 pt-3 dark:border-white/5">
                                <NavLink
                                    to="/auth/login"
                                    onClick={() => setMobileOpen(false)}
                                    className="rounded-lg border border-black/8 px-4 py-2 text-center text-sm font-medium text-foreground transition hover:bg-accent dark:border-white/10"
                                >
                                    Sign in
                                </NavLink>
                                <NavLink
                                    to="/auth/register"
                                    onClick={() => setMobileOpen(false)}
                                    className="rounded-lg bg-primary px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-primary-hover"
                                >
                                    Get started
                                </NavLink>
                            </div>
                    }
                </div>
            )}
        </header>
    )
}
