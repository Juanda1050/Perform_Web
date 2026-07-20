export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  fullName: string
  companyName: string
}

export type AuthOutcome = 'signed-in' | 'confirmation-required'
