import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { createUser, fetchUser, updateUser } from '../services/user.service'

import AsyncStorage from '@react-native-async-storage/async-storage'

export type User = {
  _id: string
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
  fetchUserData: (filters?: { [key: string]: unknown }) => Promise<User>
  createNewUser: (info: { [key: string]: unknown }) => Promise<User>
  updateAUser: (data: { [key: string]: unknown }, id: string) => Promise<User>
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
          console.log('userStore ===== ', 'user set successfully')
          console.log('#####')
        },

        fetchUserData: async (filters?: { [key: string]: unknown }): Promise<User> => {
          const userData = await fetchUser(filters)

          set({ user: userData })

          return userData
        },

        createNewUser: async (info: { [key: string]: unknown }): Promise<User> => {
          const create = await createUser(info)

          set({ user: create })

          return create
        },

        updateAUser: async (data: { [key: string]: unknown }, id: string): Promise<User> => {
          const create = await updateUser(data, id)

          set({ user: create })

          return create
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
        }
      }),
      {
        name: 'user-storage',
        storage: createJSONStorage(() => AsyncStorage)
      }
    )
  )
)
