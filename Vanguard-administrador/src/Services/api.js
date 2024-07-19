import axios from "axios"

const apiClient = axios.create({
    baseURL: 'http://localhost:2656',
    timeout: 5000,
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

//# ----------------- Admin -------------------
export const loginRequest = async (user) => {
    try {
        const response = await apiClient.post('/admin/login', user)
        return { data: response.data, error: false }
    } catch (err) {
        return {
            error: true,
            err: err.message
        }
    }
}

export const getUserDataToken = async () => {
    try {
        return await apiClient.get('/user/getByToken', {
            headers: {
                token: localStorage.getItem('token')
            }
        })
    } catch (err) {
        return {
            error: true,
            err: err.message
        }
    }
}

//# ----------------- Accounts -------------------
export const getAccounts = async () => {
    try {
        return await apiClient.get('/account/getAccounts', {
            headers: {
                token: localStorage.getItem('token')
            }
        })
    } catch (err) {
        return {
            error: true,
            err: err
        }
    }
}

export const updateBalance = async (uid, balance) => {
    try {
        return await apiClient.put(`/account/updateBalance/${uid}`, { balance })
    } catch (err) {
        return {
            error: true,
            err: err
        }
    }
}

export const getAccountById = async (uid) => {
    try {
        return await apiClient.get(`/account/getAccount/${uid}`)
    } catch (err) {
        return {
            error: true,
            err: err
        }
    }
}

//# ----------------- Transfer -------------------
export const makeTransferOwn = async (fromId, toID, amount) => {
    try {
        return await apiClient.post(`/transactions/transaction`, {
            fromAccount: fromId,
            toAccount: toID,
            amount: amount
        })
    } catch (err) {
        return {
            error: true,
            err: err
        }
    }
}

export const listTransfers = async()=>{
    try {
        
    } catch (err) {
        return {
            error: true,
            err: err
        }
    }
}

export const getThirdPAccunts = async ()=>{
    try {
        return await apiClient.get('/user/getThirdPAccount',{
            headers:{
                token: localStorage.getItem('token')
            }
        })
    } catch (err) {
        return{
            error: true,
            err: err
        }
    }
}