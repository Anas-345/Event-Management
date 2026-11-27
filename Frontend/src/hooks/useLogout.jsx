import { logoutAPI } from "@/services/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export default function useLogout() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const query = useMutation({
        mutationFn: logoutAPI,
        onSuccess: () => {
            queryClient.setQueryData(['authState'], null)
            navigate("/auth/login")
        }
    })
    return query
}