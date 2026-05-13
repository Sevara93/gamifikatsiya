import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Child, ProgressRow } from '../api/client'

interface AppState {
  child: Child | null
  token: string | null
  progress: ProgressRow[]
  unlockedWeeks: Record<string, number[]>
  setAuth: (child: Child, token: string) => void
  setProgress: (progress: ProgressRow[], unlockedWeeks: Record<string, number[]>) => void
  logout: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      child: null,
      token: null,
      progress: [],
      unlockedWeeks: { ECO_LAB: [1] },
      setAuth: (child, token) => set({ child, token }),
      setProgress: (progress, unlockedWeeks) => set({ progress, unlockedWeeks }),
      logout: () => set({ child: null, token: null, progress: [], unlockedWeeks: { ECO_LAB: [1] } }),
    }),
    { name: 'kinderlab-session', partialize: (s) => ({ child: s.child, token: s.token }) }
  )
)
