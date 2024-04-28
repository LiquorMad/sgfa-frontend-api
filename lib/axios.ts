import Axios from 'axios'

const api = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    withXSRFToken: true
})
export const csrf = () => api.get('/sanctum/csrf-cookie')

export default api