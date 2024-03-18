import axios from 'axios'

const Api = axios.create({
  // timeout: 20000,
  withCredentials: true,
  baseURL: "http://localhost:3000/api",
})

export default Api