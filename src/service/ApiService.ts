"use client";
import axios from 'axios'

const Api = axios.create({
  // timeout: 20000,
  withCredentials: true,
  baseURL:"http://localhost:3000/api",
})
// console.log("process.env.NEXT_SERVER_URL",process.env.NEXT_SERVER_URL);

export default Api