import { CalendarDays, Check } from "lucide-react"

const BRANDING_COPY = {
    register: {
        eyebrow: "Welcome aboard",
        heading: "Plan, host, and attend events — all in one place.",
        body: "Create your account to organize unforgettable experiences or discover events happening near you.",
        features: [
            "Host and manage events effortlessly",
            "Discover events tailored to your interests",
            "Connect and grow with your community",
        ],
        stats: [
            { value: "140+", label: "Events hosted" },
            { value: "8.5k", label: "Happy attendees" },
        ],
    },
    login: {
        eyebrow: "Welcome back",
        heading: "Your events, your community — right where you left them.",
        body: "Sign in to continue planning, hosting, and discovering events near you.",
        features: [
            "Pick up right where you left off",
            "Manage your events and attendees in one place",
            "Stay in the loop with real-time updates",
        ],
        stats: [
            { value: "12k+", label: "Active members" },
            { value: "2.4k", label: "Events this month" },
        ],
    },
}

export default function BrandingPanel({ variant = "register" }) {
    const { eyebrow, heading, body, features, stats } = BRANDING_COPY[variant] ?? BRANDING_COPY.register

    return <aside className="relative hidden overflow-hidden bg-primary text-white lg:flex lg:w-[46%] lg:flex-col lg:justify-between lg:p-10 xl:w-[44%] xl:p-14">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-black/15 via-transparent to-white/10" aria-hidden="true" />
        <div className="pointer-events-none absolute -top-24 -right-20 h-72 w-72 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-black/10 blur-2xl" aria-hidden="true" />
        <div className="pointer-events-none absolute top-1/3 right-14 h-2.5 w-2.5 rounded-full bg-white/40" aria-hidden="true" />
        <div className="pointer-events-none absolute top-[55%] right-24 h-1.5 w-1.5 rounded-full bg-white/25" aria-hidden="true" />
        <div className="pointer-events-none absolute bottom-1/4 left-16 h-1.5 w-1.5 rounded-full bg-white/25" aria-hidden="true" />

        <div className="relative flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15">
                <CalendarDays className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold tracking-tight">EventFlow</span>
        </div>

        <div className="relative py-10 xl:py-16">
            <p className="text-xs font-semibold tracking-[0.22em] text-white/70 uppercase">{eyebrow}</p>
            <h1 className="mt-4 max-w-md text-3xl font-semibold leading-tight xl:text-4xl">
                {heading}
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
                {body}
            </p>
            <ul className="mt-8 space-y-3.5 text-sm font-medium text-white/90">
                {features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15"><Check className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                        {feature}
                    </li>
                ))}
            </ul>
        </div>

        <div className="relative flex items-center gap-10 border-t border-white/20 pt-6">
            {stats.map(({ value, label }) => (
                <div key={label}>
                    <p className="text-2xl font-semibold">{value}</p>
                    <p className="mt-0.5 text-xs text-white/70">{label}</p>
                </div>
            ))}
        </div>
    </aside>
}