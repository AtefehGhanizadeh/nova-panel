import axios, { AxiosError } from 'axios'
import type { ApiError } from '@/types/ApiError'
import { ApiErrorCode } from '@/types/Enums/ApiErrorCode'
import { isEnumValue } from '@/Utils/isEnumValue'

const TIMEOUT_CODES: readonly string[] = [AxiosError.ECONNABORTED, AxiosError.ETIMEDOUT]

function getCodeFromStatus(status: number): ApiErrorCode {
  if (status === 400 || status === 422) return ApiErrorCode.BadRequest
  if (status === 401 || status === 403) return ApiErrorCode.Unauthorized
  if (status === 404) return ApiErrorCode.NotFound
  if (status >= 500) return ApiErrorCode.Server
  return ApiErrorCode.Unknown
}

export function isApiError(value: unknown): value is ApiError {
  return (
    typeof value === 'object' &&
    value !== null &&
    'code' in value &&
    isEnumValue(ApiErrorCode, value.code) &&
    'message' in value &&
    typeof value.message === 'string'
  )
}

export function handleApiError(error: unknown): ApiError {
  if (isApiError(error)) return error

  if (error instanceof Error && isApiError(error.cause)) return error.cause

  if (axios.isAxiosError(error)) {
    if (error.code && TIMEOUT_CODES.includes(error.code)) {
      return { code: ApiErrorCode.Timeout, message: error.message }
    }
    if (!error.response) {
      return { code: ApiErrorCode.Network, message: error.message }
    }
    const { status } = error.response
    return { status, code: getCodeFromStatus(status), message: error.message }
  }

  return {
    code: ApiErrorCode.Unknown,
    message: error instanceof Error ? error.message : 'Unknown error',
  }
}
