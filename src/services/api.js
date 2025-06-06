import axios from 'axios'

// passando o caminho da api
const api = axios.create({
    baseURL:'http://localhost:3001'
})

export default api