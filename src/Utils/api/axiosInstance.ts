import axios from 'axios'
import { tokenStorage } from '@/Storage/tokenStorage'
import { env } from '@/Utils/env'

const REQUEST_TIMEOUT_MS = 10_000

export const axiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: REQUEST_TIMEOUT_MS,
  headers: { 'Content-Type': 'application/json' },
})


axiosInstance.interceptors.request.use((config) => {
  const token = tokenStorage.getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
