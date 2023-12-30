import { useState, useEffect } from 'react'
import {
  ProductDatabaseStore,
  useProductDatabaseStore,
} from './productDatabase'

export type Product = {
  id: number
  brand: string
  category: string
  description: string
  discountPercentage: number
  images: string
  price: number
  rating: number
  stock: number
  thumbnail: string
  title: string
}

export const useGroceryData = () => {
  const { insertProduct, getProductsById } = useProductDatabaseStore(
    (state: ProductDatabaseStore) => state,
  )

  const fetched = async () => {
    try {
      const res = await fetch('https://dummyjson.com/products')
      const json = await res.json()
      const { products } = json

      const data: Product[] = products.map((element: Product) => ({
        id: element.id,
        brand: element.brand,
        category: element.category,
        description: element.description,
        discountPercentage: element.discountPercentage,
        images: JSON.stringify(element.images),
        price: element.price,
        rating: element.rating,
        stock: element.stock,
        thumbnail: element.thumbnail,
        title: element.title,
      }))

      const productsToInsert: Product[] = []
      for (const product of data) {
        const existingProduct = await getProductsById(product.id, false)
        if (!existingProduct) {
          productsToInsert.push(product)
        }
      }

      for (const product of productsToInsert) {
        try {
          await insertProduct(product)
        } catch (error) {
          console.error('Error inserting product:', error)
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return { fetched }
}
