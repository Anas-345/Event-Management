import Auth from "@/pages/auth/Auth";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Home from "@/pages/Home";
import { Route, Routes } from "react-router";

export default function Router() {
    return <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />}>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
        </Route>
    </Routes>
}