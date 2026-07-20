import { useEffect } from 'react'
import { supabase } from '@/config/supabase'
import { useAuthStore } from '@/store/auth-store'
import { mapSupabaseUser } from '@/modules/auth/utils/map-supabase-user'

export function AuthListener() {
  const setUser = useAuthStore((state) => state.setUser)
  const setInitialized = useAuthStore((state) => state.setInitialized)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ? mapSupabaseUser(session.user) : null)
      setInitialized()
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? mapSupabaseUser(session.user) : null)
    })

    return () => subscription.unsubscribe()
  }, [setUser, setInitialized])

  return null
}
