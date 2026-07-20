import { create } from 'zustand'
import type { AuthUser } from '@/types/auth'

interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  isInitialized: boolean
  setUser: (user: AuthUser | null) => void
  setInitialized: () => void
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isAuthenticated: false,
  isInitialized: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setInitialized: () => set({ isInitialized: true }),
}))
