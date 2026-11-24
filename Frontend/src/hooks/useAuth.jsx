import { userAPI } from "@/services/auth"
import { useQuery } from "@tanstack/react-query"

const useAuth = () => {
    const query = useQuery({
        queryKey: ['authState'],
        queryFn: userAPI
    })
    return query
}

export default useAuth