import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { createProduct, fetchProducts } from '../services/product.service'
import { Product } from '../database/GroceryData'

import AsyncStorage from '@react-native-async-storage/async-storage'

export interface ProductState {
  products: Product[]
  productId: string[]
  wishes: string[]

  setProductId: (productId: string[]) => void
  fetchProductsData: (filters?: { [key: string]: unknown }) => Promise<Product>
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

        fetchProductsData: async (filters?: { [key: string]: unknown }): Promise<Product> => {
          const productData = await fetchProducts(filters)

          set({ products: productData })

          return productData
        },

        createNewProduct: async (info: { [key: string]: unknown }): Promise<Product> => {
          const create = await createProduct(info)

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

        setProductId(productId) {
          set((state) => ({
            productId: [...state.productId, ...productId]
          }))
          console.log('#####')
          console.log('productStore ===== ', 'set product id')
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
