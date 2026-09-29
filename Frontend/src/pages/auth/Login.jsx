import { CalendarDays } from "lucide-react"
import BrandingPanel from "@/components/auth/BrandingPanel"
import LoginForm from "@/components/auth/LoginForm"
import { NavLink } from "react-router"

export default function Login() {
    return (
        <>
            <BrandingPanel variant="login" />

            <section className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:flex-1 lg:px-10 xl:px-16">
                <div className="w-full max-w-md">
                    <div className="mb-8 flex flex-col items-center gap-3 lg:hidden">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/30">
                            <CalendarDays className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <p className="text-lg font-semibold tracking-tight">EventFlow</p>
                    </div>
                    <LoginForm />
                    <p className="mt-6 text-center text-sm text-text-secondary">
                        Don't have an account?{" "}
                        <NavLink to="/auth/register" className="cursor-pointer font-medium text-primary">Sign up</NavLink>
                    </p>
                </div>
            </section>
        </>
    )
}