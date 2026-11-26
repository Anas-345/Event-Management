import { CalendarDays } from "lucide-react"

export default function AppLoader() {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8 bg-background">
            <div className="flex flex-col items-center gap-3">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/30">
                    <CalendarDays className="h-7 w-7 text-white" aria-hidden="true" />
                    <span className="absolute inset-0 rounded-2xl bg-primary opacity-30 animate-ping" aria-hidden="true" />
                </div>
                <span className="text-base font-semibold tracking-tight text-foreground">EventFlow</span>
            </div>

            <div className="flex items-end gap-1.5" role="status" aria-label="Loading">
                {[0, 1, 2, 3, 4].map((i) => (
                    <span
                        key={i}
                        className="block w-1.5 rounded-full bg-primary"
                        style={{
                            height: "6px",
                            animation: "dotWave 1.1s ease-in-out infinite",
                            animationDelay: `${i * 0.12}s`,
                        }}
                        aria-hidden="true"
                    />
                ))}
                <span className="sr-only">Loading…</span>
            </div>

            <style>{`
                @keyframes dotWave {
                    0%, 100% { height: 6px;  opacity: 0.35; }
                    40%       { height: 22px; opacity: 1;    }
                }
            `}</style>
        </div>
    )
}
