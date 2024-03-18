import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

import AsyncStorage from '@react-native-async-storage/async-storage'

export interface ProductState {
  productId: string[]
  wishes: string[]

  setProductId: (productId: string[]) => void
  setWishes: (wishes: string[]) => void
  removeProductId: (productIdToRemove: string) => void
  removeWish: (wishToRemove: string) => void
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
          console.log('#####')
          console.log('productStore ===== ', 'set product id')
          console.log('#####')
        },

        setWishes(wishes) {
          set((state) => ({
            wishes: [...state.wishes, ...wishes]
          }))
          console.log('#####')
          console.log('productStore ===== ', 'set wishes')
          console.log('#####')
        },

        removeProductId: (productIdToRemove) => {
          set((state) => ({
            productId: state.productId.filter((id) => id !== productIdToRemove)
          }))
          console.log('#####')
          console.log('productStore ===== ', 'a product clear')
          console.log('#####')
        },

        removeWish: (wishToRemove) => {
          set((state) => ({
            wishes: state.wishes.filter((id) => id !== wishToRemove)
          }))
          console.log('#####')
          console.log('productStore ===== ', 'a wish clear')
          console.log('#####')
        },

        clearFn: () => {
          set({
            productId: []
          })
          console.log('#####')
          console.log('productStore ===== ', 'store clear')
          console.log('#####')
        },

        clearWishes: () => {
          set({
            wishes: []
          })
          console.log('#####')
          console.log('productStore ===== ', 'wishes clear')
          console.log('#####')
        }
      }),
      {
        name: 'product-storage',
        storage: createJSONStorage(() => AsyncStorage)
      }
    )
  )
)
