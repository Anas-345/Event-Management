import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import toast from "../toast/Toast"
import InputField from "../common/InputField"
import { loginValidator } from "@/validators/authValidator"
import { loginAPI } from "@/services/auth"
import { useNavigate } from "react-router"


export default function LoginForm() {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(loginValidator)
    })

    async function submit(data) {
        const res = await loginAPI(data)
        if (!res) return
        toast({ title: "Login", type: "success", message: res.data.message })
        navigate("/")
    }

    function handleErrors(errors) {
        const firstError = Object.values(errors)[0]?.message
        console.log(firstError)
        toast({
            type: "error",
            message: firstError || "Please review the highlighted fields and try again.",
        })
    }

    return <div className="rounded-2xl border border-black/5 bg-surface p-6 shadow-xl shadow-foreground/5 sm:p-8 dark:border-white/10">
        <div className="mb-6">
            <h2 className="text-2xl font-semibold tracking-tight">Welcome back</h2>
            <p className="mt-1.5 text-sm text-text-secondary">
                Sign in to your account to continue.
            </p>
        </div>

        <form onSubmit={handleSubmit(submit, handleErrors)} className="space-y-5" noValidate>

            {
                [
                    {
                        fieldName: "email",
                        id: "email",
                        errors: errors.email,
                        placeholder: "you@example.com",
                        label: "Email address",
                        type: "email"
                    },
                    {
                        fieldName: "password",
                        id: "password",
                        errors: errors.password,
                        placeholder: "Enter a password",
                        label: "Password",
                        type: "password"
                    },
                ].map((i, idx) =>
                    <InputField
                        key={idx}
                        error={i.errors}
                        register={register}
                        id={i.id}
                        placeholder={i.placeholder}
                        label={i.label}
                        fieldName={i.fieldName}
                        type={i.type}
                    />
                )
            }

            <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-surface active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-primary disabled:active:scale-100 cursor-pointer"
            >
                {isSubmitting && (
                    <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                )}
                {isSubmitting ? "Signing in..." : "Sign in"}
            </button>

            <p className="text-center text-sm">
                <span className="cursor-pointer font-medium text-primary">Forgot your password?</span>
            </p>
        </form>
    </div>
}