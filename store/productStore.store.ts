import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

import AsyncStorage from '@react-native-async-storage/async-storage'

export interface ProductState {
  productId: string[]
  wishes: string[]

  setProductId: (productId: string[]) => void
  setWishes: (wishes: string[]) => void
  removeProductId: (productIdToRemove: string) => void
  removeWish:(wishToRemove: string) => void
  clearFn: () => void
  clearWishes: () => void
}

export const useProductStore = create<ProductState>()(
  devtools(
    persist(
      (set) => ({
        productId: [],
        wishes: [],

        setProductId(productId) {
          set((state) => ({
            productId: [...state.productId, ...productId]
          }))
        },

        setWishes(wishes) {
          set((state) => ({
            wishes: [...state.wishes, ...wishes]
          }))
        },

        removeProductId: (productIdToRemove) => {
          set((state) => ({
            productId: state.productId.filter((id) => id !== productIdToRemove)
          }))
        },

        removeWish: (wishToRemove) => {
          set((state) => ({
            wishes: state.wishes.filter((id) => id !== wishToRemove)
          }))
        },

        clearFn: () => {
          set({
            productId: [],
          })
          console.log('productStore ===== store clear');
        },

        clearWishes: () => {
          set({
            wishes: [],
          })
          console.log('productStore ===== store clear');
        }
      }),
      {
        name: 'product-storage',
        storage: createJSONStorage(() => AsyncStorage)
      }
    )
  )
)
