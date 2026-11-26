import { Outlet } from "react-router";
import Header from "../Header";
import Footer from "../Footer";

export default function PublicLayout() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex flex-1 flex-col">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
