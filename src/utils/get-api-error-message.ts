import { isAxiosError } from 'axios'
import type { ApiError } from '@/types/api'

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (isAxiosError<ApiError>(error) && error.response?.data?.message) {
    return error.response.data.message
  }
  return fallback
}
