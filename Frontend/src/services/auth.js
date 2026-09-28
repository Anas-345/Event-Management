import axios from "axios"

const API = import.meta.env.VITE_API_URL

async function registerAPI(data) {
    try {
        const res = await axios.post(`${API}/auth/register`, data)
        return res
    } catch (error) {
        return error.response
    }
}

export { registerAPI }