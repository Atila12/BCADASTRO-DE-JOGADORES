import axios from 'axios'

// passando o caminho da api
const api = axios.create({
    baseURL:'http://host.docker.internal:3001'
})

export default api