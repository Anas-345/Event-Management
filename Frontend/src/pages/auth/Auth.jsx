import { Outlet } from "react-router";

export default function Auth() {
    return <main className="min-h-screen bg-background text-foreground lg:flex">
        <Outlet />
    </main>
}