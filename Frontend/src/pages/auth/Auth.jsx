import { Outlet } from "react-router";

export default function Auth() {
    return (
        <div className="flex flex-1 bg-background text-foreground lg:flex-row">
            <Outlet />
        </div>
    )
}
