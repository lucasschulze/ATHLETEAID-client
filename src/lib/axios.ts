import axios from 'axios'

import { env } from '@/schemas/envSchema'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
})
