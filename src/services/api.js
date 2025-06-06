import axios from 'axios'

// passando o caminho da api
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export default api