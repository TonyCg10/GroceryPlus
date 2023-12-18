import { create } from 'zustand'

const product = {
  productId: [],
}

export interface ProductState {
  productId: number[]

  setProductId: (productId: number[]) => void
}

export const useProductStore = create<ProductState>()((set) => ({
  ...product,

  setProductId(productId) {
    set((state) => ({
      productId: [...state.productId, ...productId],
    }))
  },
}))
