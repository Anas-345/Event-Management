import { CalendarDays } from "lucide-react"
import { NavLink } from "react-router"

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="border-t border-black/10 bg-accent dark:border-white/5">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col items-center justify-between gap-2 border-t border-black/5 py-5 text-xs text-text-secondary sm:flex-row dark:border-white/5">
                    <p>
                        &copy; {year} EventFlow. All rights reserved.
                    </p>
                    <p>
                        Developed by{" "}
                        <span className="font-medium text-foreground">Anas Munir</span>
                    </p>
                </div>

            </div>
        </footer>
    )
}
