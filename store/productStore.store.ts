import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

import AsyncStorage from '@react-native-async-storage/async-storage'

export interface ProductState {
  productId: number[]
  wishes: number[]

  setProductId: (productId: number[]) => void
  setWishes: (wishes: number[]) => void
  removeProductId: (productIdToRemove: number) => void
  clearFn: () => void
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

        clearFn: () => {
          set({
            productId: [],
            wishes: [],
          })
        }
      }),
      {
        name: 'product-storage',
        storage: createJSONStorage(() => AsyncStorage)
      }
    )
  )
)
