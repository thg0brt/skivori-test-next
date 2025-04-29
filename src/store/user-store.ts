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
  increaseBalance: (amount: number) => Promise<void>
  decreaseBalance: (amount: number) => Promise<void>
  logout: () => void
}

export const UserStore = create<UserState>()(
  persist(
    (set, get) => ({
      id: 0,
      name: '',
      email: '',
      balance: 0,
      isStoreSet: false,
      hasHydrated: false,
      setUser: (user) => set({ ...user, isStoreSet: true }),
      setIsStoreSet: (isSet) => set({ isStoreSet: isSet }),
      setHasHydrated: (v) => set({ hasHydrated: v }),
      increaseBalance: async (amount: number) => {
        const { id, balance } = get();
        const newBalance = balance + amount;

        set({ balance: newBalance });

        try {
          await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/update/"+id, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ balance: newBalance }),
          });
        } catch (error) {
          console.error("Error:", error);
        }
      },
      decreaseBalance: async (amount: number) => {
        const { id, balance } = get();
        const newBalance = Math.max(0, balance - amount);

        set({ balance: newBalance });

        try {
          await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/update/"+id, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ balance: newBalance }),
          });
        } catch (error) {
          console.error("Error:", error);
        }
      },
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