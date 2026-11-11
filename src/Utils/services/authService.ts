import type { LoginRequest, LoginResponse } from '@/types/Auth'
import { axiosInstance } from '@/Utils/api/axiosInstance'
import { API_ENDPOINTS } from '@/Utils/api/endpoints'

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const { data } = await axiosInstance.post<LoginResponse>(API_ENDPOINTS.login, credentials)
    return data
  },
}
