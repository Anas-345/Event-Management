import ProtectedLayout from "@/components/ui/layouts/ProtectedLayout";
import PublicLayout from "@/components/ui/layouts/PublicLayout";
import Auth from "@/pages/auth/Auth";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Dashboard from "@/pages/Dashboard";
import Home from "@/pages/Home";
import { Route, Routes } from "react-router";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<PublicLayout />}>
                <Route index element={<Home />} />
                <Route path="auth" element={<Auth />}>
                    <Route path="register" element={<Register />} />
                    <Route path="login" element={<Login />} />
                </Route>
            </Route>
            <Route path="/dashboard" element={<ProtectedLayout />}>
                <Route index element={<Dashboard />} />
            </Route>
        </Routes>
    )
}