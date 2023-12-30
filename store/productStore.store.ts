import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

import AsyncStorage from '@react-native-async-storage/async-storage'

const product = {
  productId: [],
}

export interface ProductState {
  productId: number[]

  setProductId: (productId: number[]) => void
  removeProductId: (productIdToRemove: number) => void
  clearFn: () => void
}

export const useProductStore = create<ProductState>()(
  devtools(
    persist(
      (set) => ({
        ...product,

        setProductId(productId) {
          set((state) => ({
            productId: [...state.productId, ...productId],
          }))
        },
        removeProductId: (productIdToRemove) => {
          set((state) => ({
            productId: state.productId.filter((id) => id !== productIdToRemove),
          }))
        },

        clearFn: () => {
          set(product)
        },
      }),
      {
        name: 'product-storage',
        storage: createJSONStorage(() => AsyncStorage),
      },
    ),
  ),
)
