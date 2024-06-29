import axios from "axios"

const apiClient = axios.create({
    baseURL: 'http://localhost:',
    timeout: 5000
})

apiClient.interceptors.request.use(
    (config) => {
        const userDetails = localStorage.getItem('user')
        if (userDetails) {
            const token = JSON.parse(userDetails).token
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    }, (err) => Promise.reject(err)
)

//# ----------------- User -------------------
//& Login
export const loginRequest = async (user) => {
    try {
        //% LoginRequest
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}