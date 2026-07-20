import { supabase } from '@/config/supabase'
import type { AuthUser } from '@/types/auth'
import type { AuthOutcome, LoginRequest, RegisterRequest } from '@/modules/auth/types/auth'
import { mapSupabaseUser } from '@/modules/auth/utils/map-supabase-user'

export const authService = {
  async login(payload: LoginRequest): Promise<AuthUser> {
    const { data, error } = await supabase.auth.signInWithPassword(payload)
    if (error) throw error
    return mapSupabaseUser(data.user)
  },

  async register(
    payload: RegisterRequest,
  ): Promise<{ outcome: AuthOutcome; user: AuthUser | null }> {
    const { data, error } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        data: {
          fullName: payload.fullName,
          companyName: payload.companyName,
        },
      },
    })
    if (error) throw error

    if (data.session && data.user) {
      return { outcome: 'signed-in', user: mapSupabaseUser(data.user) }
    }
    return { outcome: 'confirmation-required', user: null }
  },

  async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },
}
