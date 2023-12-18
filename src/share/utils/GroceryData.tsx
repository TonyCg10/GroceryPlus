import { useState, useEffect } from 'react'

export type DataType = {
  id: number
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
  position: number
}

export const useGroceryData = () => {
  const [groceryData, setData] = useState<DataType[]>([])

  const fetched = async () => {
    try {
      const res = await fetch('https://dummyjson.com/products')
      const json = await res.json()
      const { products } = json

      const data: DataType[] = products.map((element: DataType) => ({
        id: element.id,
        brand: element.brand,
        category: element.category,
        description: element.description,
        discountPercentage: element.discountPercentage,
        images: element.images,
        price: element.price,
        rating: element.rating,
        stock: element.stock,
        thumbnail: element.thumbnail,
        title: element.title,
      }))

      setData(data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetched()
  }, [])

  const groceryDataTitle = groceryData.map((data) => data.title)

  return { groceryData, setData, groceryDataTitle }
}
