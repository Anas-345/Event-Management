import useAuth from "@/hooks/useAuth";
import AppLoader from "./AppLoader";
import Router from "@/router/Router";

export default function AppContent() {
    const { isPending } = useAuth() 

    return isPending ? <AppLoader /> : <Router />

}