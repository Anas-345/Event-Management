import { registerValidator } from "@/validators/registerValidator"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronDownIcon, CircleAlert } from "lucide-react"
import { useForm } from "react-hook-form"
import toast from "../toast/Toast"
import InputField from "../common/InputField"
import { fieldClass } from "../common/inputFieldStyle"

export default function RegisterForm() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(registerValidator)
    })

    function submit(data) {
        console.log(data)
        toast({ title: "Register", type: "success", message: "Account created! Welcome to EventFlow — your journey starts here.", })
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
            <h2 className="text-2xl font-semibold tracking-tight">Create your account</h2>
            <p className="mt-1.5 text-sm text-text-secondary">
                Join our community in less than a minute.
            </p>
        </div>

        <form onSubmit={handleSubmit(submit, handleErrors)} className="space-y-5" noValidate>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {
                    [
                        {
                            fieldName: "firstName",
                            id: "first-name",
                            errors: errors.firstName,
                            placeholder: "William",
                            label: "First name"
                        },
                        {
                            fieldName: "lastName",
                            id: "last-name",
                            errors: errors.lastName,
                            placeholder: "Vangeance",
                            label: "Last name"
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
                            type="text"
                        />
                    )
                }
            </div>
            <InputField
                error={errors.email}
                register={register}
                id="email"
                placeholder="you@example.com"
                label="Email address"
                fieldName="email"
                type="email"
            />
            <div>
                <label htmlFor="role" className="mb-1.5 block text-sm font-medium">
                    I want to join as <span className="text-danger">*</span>
                </label>
                <div className="relative">
                    <select
                        id="role"
                        aria-invalid={errors.role ? "true" : undefined}
                        {...register("role")}
                        className={`${fieldClass(!!errors.role)} appearance-none pr-10`}
                    >
                        <option value="" disabled>Choose your role</option>
                        <option value="organizer">Organizer — plan and host events</option>
                        <option value="attendee">Attendee — discover and join events</option>
                        <option value="admin">Admin — manage the platform</option>
                    </select>
                    <ChevronDownIcon className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" aria-hidden="true" />
                </div>
                {errors.role && (
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-danger" role="alert">
                        <CircleAlert className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> {errors.role.message}
                    </p>
                )}
            </div>
            {
                [
                    {
                        fieldName: "password",
                        id: "password",
                        errors: errors.password,
                        placeholder: "Enter a password",
                        label: "Password"
                    },
                    {
                        fieldName: "cnfrm",
                        id: "cnfrm",
                        errors: errors.cnfrm,
                        placeholder: "Re-enter your password",
                        label: "Confirm password"
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
                        type="password"
                    />
                )
            }

            <button
                type="submit"
                className="mt-2 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-surface active:scale-[0.99] cursor-pointer"
            >
                Create account
            </button>

            <p className="text-center text-xs leading-relaxed text-text-secondary">
                By creating an account, you agree to our <span className="font-medium text-foreground">Terms of Service</span> and <span className="font-medium text-foreground">Privacy Policy</span>.
            </p>
        </form>
    </div>
}