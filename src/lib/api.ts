import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/',
  timeout: 2000,
  withCredentials: true,
})

export default api