import axios from 'axios'

// passando o caminho da api
const api = axios.create({
    baseURL:'http://srv574063.hstgr.cloud:3001/'
})

export default api