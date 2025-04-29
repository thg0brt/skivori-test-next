'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  id: number
  name: string
  email: string
  balance: number
  isStoreSet: boolean,
  hasHydrated: boolean
  setUser: (user: { id: number, name: string, email: string, balance: number }) => void
  setIsStoreSet: (isSet: boolean) => void
  setHasHydrated: (v: boolean) => void
  logout: () => void
}

export const UserStore = create<UserState>()(
  persist(
    (set) => ({
      id: 0,
      name: '',
      email: '',
      balance: 0,
      isStoreSet: false,
      hasHydrated: false,
      setUser: (user) => set({ ...user, isStoreSet: true }),
      setIsStoreSet: (isSet) => set({ isStoreSet: isSet }),
      setHasHydrated: (v) => set({ hasHydrated: v }),
      logout: () =>{
        localStorage.removeItem('user-store')
        set({
          id: 0,
          name: '',
          email: '',
          balance: 0,
          isStoreSet: false,
          hasHydrated: false
        })
      }
    }),
    {
      name: 'user-store',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    },
  )
)