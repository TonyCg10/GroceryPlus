import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { createProduct, fetchProducts } from '../services/product.service'
import { Product } from '../database/GroceryData'

export interface ProductState {
  products: Product[]
  productId: string[]
  wishes: string[]

  setProductId: (productId: string[]) => void
  fetchProductsData: (filters?: { [key: string]: unknown }) => Promise<void>
  createNewProduct: (info: { [key: string]: unknown }) => Promise<Product>
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
        products: [],
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

        fetchProductsData: async (filters?: { [key: string]: unknown }): Promise<void> => {
          const productData = await fetchProducts(filters)

          set({ products: productData })

          console.log('#####')
          console.log('productStore ===== ', 'fetchProductsData')
          console.log('#####')
        },

        createNewProduct: async (info: { [key: string]: unknown }): Promise<Product> => {
          const create = await createProduct(info)

          console.log('#####')
          console.log('productStore ===== ', 'createNewProduct')
          console.log('#####')

          return create
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
