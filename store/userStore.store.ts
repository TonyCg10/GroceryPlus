import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type User = {
  _id: any
  name: string
  email: string
  password: string
  phone: string
  img: string
  productId: number[]
}

export interface UserState {
  user: User

  setUser: (user: Partial<User>) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: {
          _id: '',
          name: '',
          email: '',
          password: '',
          phone: '',
          img: '',
          productId: []
        },

        setUser: (user) => {
          set((state) => ({
            user: {
              ...state.user,
              ...user
            }
          }))
          console.log('userStore ===== ', 'user set successfully', user)
        },

        clearUser: () => {
          set({
            user: {
              _id: '',
              name: '',
              email: '',
              password: '',
              phone: '',
              img: '',
              productId: []
            }
          })
          console.log('userStore ===== ', 'store clear')
        }
      }),
      {
        name: 'user-storage',
        storage: createJSONStorage(() => AsyncStorage)
      }
    )
  )
)
