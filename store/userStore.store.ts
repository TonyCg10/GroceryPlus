import { create } from 'zustand'
import { User } from './authStore.store'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface UserState {
  user: User

  setUser: (user: User) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: {
          id: 0,
          name: '',
          email: '',
          password: '',
          phone: '',
          img: '',
        },

        setUser: (updatedUser) => {
          set((state) => ({
            user: {
              ...state.user,
              ...updatedUser,
            },
          }))
        },

        clearUser: () => {
          set({
            user: {
              id: 0,
              name: '',
              email: '',
              password: '',
              phone: '',
              img: '',
            },
          })
        },
      }),
      {
        name: 'user-storage',
        storage: createJSONStorage(() => AsyncStorage),
      },
    ),
  ),
)
