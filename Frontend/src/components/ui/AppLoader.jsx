import { Loader2 } from "lucide-react";

export default function AppLoader() {
    return <div>
        <Loader2 className="animate-spin" />
        <h3>Loading</h3>
    </div>
}