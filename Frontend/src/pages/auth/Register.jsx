import { CalendarDays } from "lucide-react"
import BrandingPanel from "@/components/auth/BrandingPanel"
import RegisterForm from "@/components/auth/RegisterForm"
import { NavLink } from "react-router"

export default function Register() {
    return (
        <>
            <BrandingPanel />

            <section className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6 lg:px-10 xl:px-16">
                <div className="w-full max-w-md">
                    <div className="mb-8 flex flex-col items-center gap-3 lg:hidden">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/30">
                            <CalendarDays className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <p className="text-lg font-semibold tracking-tight">EventFlow</p>
                    </div>
                    <RegisterForm />

                    <p className="mt-6 text-center text-sm text-text-secondary">
                        Already have an account?{" "}
                        <NavLink to="/auth/login" className="cursor-pointer font-medium text-primary">Sign in</NavLink>
                    </p>
                </div>
            </section>
        </>
    )
}
