import axios from 'axios'

// passando o caminho da api
const api = axios.create({
    baseURL:'http://localhost:3000'
})

export default api