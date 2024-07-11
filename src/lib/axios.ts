import axios from 'axios'

import { env } from '@/schemas/envSchema'
import { getUserLocalStorage } from '@/api/sign-in'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
})

api.interceptors.request.use(
  (config) => {
    const user = getUserLocalStorage()
    config.headers["Authorization"] = `Bearer ${user?.token}`;

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)