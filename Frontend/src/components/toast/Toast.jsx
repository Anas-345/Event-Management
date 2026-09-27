import { createRoot } from "react-dom/client"
import Toast from "./ToastView"

export default function toast(options = {}) {
    const { type = "info", title, message, duration = 4000 } = options
    const el = document.createElement("div")
    document.body.appendChild(el)
    const root = createRoot(el)

    function handleClose() {
        root.unmount()
        el.remove()
    }

    root.render(
        <Toast
            visible={true}
            type={type}
            title={title}
            message={message}
            duration={duration}
            onClose={handleClose}
        />
    )
}