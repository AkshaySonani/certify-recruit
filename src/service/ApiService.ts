'use client';
import axios from 'axios';

const API = axios.create({
  // timeout: 20000,
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_BASE_URL + 'api',
  // baseURL: 'http://localhost:3000/api',
});
// console.log("process.env.NEXT_SERVER_URL",process.env.NEXT_SERVER_URL);

export default API;
