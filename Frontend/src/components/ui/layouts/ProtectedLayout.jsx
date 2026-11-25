import useAuth from "@/hooks/useAuth"
import { Navigate, Outlet } from "react-router"

export default function ProtectedLayout() {
    const { data } = useAuth()
    return data?.data?.id ? <Outlet /> : <Navigate to="/auth/login" replace />
}