import { api } from "./axios"

function registerAPI(data) {
    return api.post('/auth/register', data)
}

function loginAPI(data) {
    return api.post('/auth/login', data)
}

function userAPI() {
    return api.get('/auth/me')
}

function logoutAPI() {
    return api.get('/auth/logout')
}

export { registerAPI, loginAPI, userAPI, logoutAPI }