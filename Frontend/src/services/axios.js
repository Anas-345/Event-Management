import toast from '@/components/toast/Toast'
import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

api.interceptors.response.use(
    (res) => res,
    async function (error) {
        if (error.response.data?.tokenNotFound) {
            await api.get('/refreshToken')
            return api(error.config)
        }
        return toast({ title: "Error", type: "error", message: error.response.data.message })
    }
)

export { api }