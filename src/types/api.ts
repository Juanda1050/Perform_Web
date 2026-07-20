export interface ApiSuccess<T> {
  success: true
  data: T
  timestamp: string
}

export interface ApiErrorDetail {
  field: string
  constraints: string[]
}

export interface ApiError {
  success: false
  error: {
    code: string
    module: string
    details: ApiErrorDetail[] | null
  }
  statusCode: number
  path: string
  timestamp: string
  message: string
}
