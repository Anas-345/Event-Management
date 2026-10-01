import { api } from "./axios"

async function registerAPI(data) {
    return await api.post('/auth/register', data)
}

async function loginAPI(data) {
    return await api.post('/auth/login', data,)
}

export { registerAPI, loginAPI }