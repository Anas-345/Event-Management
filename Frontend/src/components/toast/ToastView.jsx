import { useEffect, useState } from "react"
import { TOAST_STYLES } from "@/data/toasts"
import { X } from "lucide-react"

export default function Toast({ visible = true, type = "info", title, message, duration = 4000, onClose }) {
    const [leaving, setLeaving] = useState(false)
    const style = TOAST_STYLES[type] ?? TOAST_STYLES.info

    useEffect(() => {
        if (!visible) return
        setLeaving(false)
        if (duration <= 0) return

        const timer = window.setTimeout(() => {
            setLeaving(true)
        }, duration)

        return () => window.clearTimeout(timer)
    }, [visible, duration])

    useEffect(() => {
        if (!leaving) return
        const timer = window.setTimeout(() => {
            onClose?.()
        }, 220)

        return () => window.clearTimeout(timer)
    }, [leaving, onClose])

    if (!visible) return null

    return (
        <div className="fixed top-5 right-5 z-100 flex max-w-sm w-full items-center pointer-events-none px-4">
            <div
                role="alert"
                className={`pointer-events-auto flex w-full items-center gap-2.5 rounded-lg border bg-surface px-3.5 py-2.5 text-sm shadow-md transition-all ${style.border} ${leaving ? "animate-toast-out" : "animate-toast-in"
                    }`}
            >
                <span className={`shrink-0 ${style.color}`}>
                    {style.icon}
                </span>

                <div className="min-w-0 flex-1">
                    {title && <p className="font-semibold text-foreground text-xs leading-tight">{title}</p>}
                    {message && <p className="text-foreground text-sm font-medium leading-snug">{message}</p>}
                </div>

                <button
                    type="button"
                    onClick={() => setLeaving(true)}
                    aria-label="Dismiss notification"
                    className="ml-1 shrink-0 rounded p-1 text-text-secondary hover:text-foreground transition-colors"
                >
                    <X className="h-4 w-4" aria-hidden="true" />
                </button>
            </div>
        </div>
    )
}