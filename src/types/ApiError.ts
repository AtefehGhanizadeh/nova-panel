import type { ApiErrorCode } from '@/types/Enums/ApiErrorCode'

export interface ApiError {
  status?: number
  code: ApiErrorCode
  message: string
}
