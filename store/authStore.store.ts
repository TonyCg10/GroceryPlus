import { create } from 'zustand'

const auth = {
  userName: '',
  userEmail: '',
  userPassword: '',
  userPhone: '',
}

export interface AuthState {
  userName: string
  userEmail: string
  userPassword: string
  userPhone: string

  setUserName: (userName: string) => void
  setUserEmail: (userEmail: string) => void
  setUserPassword: (userPassword: string) => void
  setUserPhone: (userPhone: string) => void
}

export const useAuthStore = create<AuthState>()((set) => ({
  ...auth,

  setUserName(userName) {
    set({
      userName,
    })
  },
  setUserEmail(userEmail) {
    set({
      userEmail,
    })
  },
  setUserPassword(userPassword) {
    set({
      userPassword,
    })
  },
  setUserPhone(userPhone) {
    set({
      userPhone,
    })
  },
}))
