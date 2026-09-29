import axios from "axios"

const API = `${import.meta.env.VITE_API_URL}/auth`

async function registerAPI(data) {
    try {
        const res = await axios.post(`${API}/register`, data)
        return res
    } catch (error) {
        return error.response
    }
}

async function loginAPI(data) {
    try {
        const res = await axios.post(`${API}/login`, data, { withCredentials: true })
        return res
    } catch (error) {
        return error.response
    }
}

export { registerAPI, loginAPI }