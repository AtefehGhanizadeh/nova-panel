import axios from 'axios'
import { logout } from '@/Redux/slices/authSlice'
import type { AppStore } from '@/Redux/store'
import { axiosInstance } from '@/Utils/api/axiosInstance'
import { API_ENDPOINTS } from '@/Utils/api/endpoints'
import { handleApiError } from '@/Utils/api/handleApiError'

const UNAUTHORIZED_STATUS = 401

export function setupInterceptors(store: AppStore): void {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
      const apiError = handleApiError(error)

      const isLoginRequest = axios.isAxiosError(error) && error.config?.url === API_ENDPOINTS.login

      if (apiError.status === UNAUTHORIZED_STATUS && !isLoginRequest) {
        store.dispatch(logout())
      }

      return Promise.reject(new Error(apiError.message, { cause: apiError }))
    },
  )
}
