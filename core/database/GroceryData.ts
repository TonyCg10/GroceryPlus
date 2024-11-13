import { useEffect } from 'react'
import { ProductState, useProductStore } from '../store/productStore.store'

export type Product = {
  _id?: string
  brand: string
  category: string
  description: string
  discountPercentage: number
  images: string[]
  price: number
  rating: number
  stock: number
  thumbnail: string
  title: string
}

export const useGroceryData = () => {
  const { products, fetchProductsData, createNewProduct } = useProductStore(
    (state: ProductState) => state
  )

  useEffect(() => {
    fetchProductsData()
  }, [])

  const fetched = async () => {
    try {
      const res = await fetch('https://dummyjson.com/products')

      if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`)
      }

      const json = await res.json()

      const data: Product[] = json.products.map((element: Product) => ({
        brand: element.brand,
        category: element.category,
        description: element.description,
        discountPercentage: element.discountPercentage,
        images: element.images,
        price: element.price,
        rating: element.rating,
        stock: element.stock,
        thumbnail: element.thumbnail,
        title: element.title
      }))

      const unmatchedProducts = data.filter((d) => !products.some((p) => p.title === d.title))

      if (unmatchedProducts.length === 0) {
        console.log('====================================')
        console.log('All products already fetched')
        console.log('====================================')
        return
      } else {
        console.log('====================================')
        console.log('New Products', unmatchedProducts)
        console.log('====================================')
      }

      for (const product of unmatchedProducts) {
        try {
          await createNewProduct(product)
          console.log(`Product -- ${product.title} -- added`)
        } catch (error) {
          console.error(`Error checking product: ${error}`)
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return { fetched }
}
