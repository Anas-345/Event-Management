import { CircleCheckBig, CircleParkingOffIcon,  CircleX, TriangleAlert } from "lucide-react"

const TOAST_STYLES = {
    success: {
        icon: <CircleCheckBig className="h-5 w-5" aria-hidden="true" />,
        color: "text-success",
        border: "border-success/30",
    },
    error: {
        icon: <CircleX className="h-5 w-5" aria-hidden="true" />,
        color: "text-danger",
        border: "border-danger/30",
    },
    info: {
        icon: <CircleParkingOffIcon className="h-5 w-5" aria-hidden="true" />,
        color: "text-primary",
        border: "border-primary/30",
    },
    warning: {
        icon: <TriangleAlert className="h-5 w-5" aria-hidden="true" />,
        color: "text-warning",
        border: "border-warning/30",
    },
}

export { TOAST_STYLES }