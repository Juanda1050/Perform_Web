import type { User } from '@supabase/supabase-js'
import type { AuthUser } from '@/types/auth'

export function mapSupabaseUser(user: User): AuthUser {
  return {
    id: user.id,
    email: user.email ?? '',
    fullName:
      typeof user.user_metadata.fullName === 'string' ? user.user_metadata.fullName : undefined,
  }
}
