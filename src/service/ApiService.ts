'use client';
import axios from 'axios';

const API = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXTAUTH_URL + 'api',
});

export default API;
