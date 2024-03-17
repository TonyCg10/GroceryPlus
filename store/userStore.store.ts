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
  stripeCustomerId: string
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
          stripeCustomerId: ''
        },

        setUser: (user) => {
          set((state) => ({
            user: {
              ...state.user,
              ...user
            }
          }))
          console.log('#####')
          console.log('userStore ===== ', 'user set successfully', user)
          console.log('#####')
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
              stripeCustomerId: ''
            }
          })
          console.log('#####')
          console.log('userStore ===== ', 'store clear')
          console.log('#####')
        }
      }),
      {
        name: 'user-storage',
        storage: createJSONStorage(() => AsyncStorage)
      }
    )
  )
)
