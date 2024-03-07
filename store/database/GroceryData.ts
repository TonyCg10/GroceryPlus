import { IP, PORT, PRODUCT } from '../../express/utils'

import axios from 'axios'

export type Product = {
  _id: string
  id: number
  brand: string
  category: string
  description: string
  discountPercentage: number
  images: [string]
  price: number
  rating: number
  stock: number
  thumbnail: string
  title: string
}

export const useGroceryData = () => {
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
        images: element.images,
        price: element.price,
        rating: element.rating,
        stock: element.stock,
        thumbnail: element.thumbnail,
        title: element.title
      }))

      try {
        const productListResponse = await axios.get(`http://${IP}:${PORT}/${PRODUCT}/`)
        const productList = productListResponse.data.data

        if (productList.length !== 0) {
          return
        }

        for (const product of productList) {
          const productId = product.id

          const checkProductResponse = await axios.get(
            `http://${IP}:${PORT}/${PRODUCT}/check/${productId}`
          )

          if (checkProductResponse.status === 404) {
            for (const product of data) {
              const addProductResponse = await axios.post(
                `http://${IP}:${PORT}/${PRODUCT}/products`,
                product
              )

              if (addProductResponse.status === 201) {
                console.log(`Product -- ${product} -- added`)
              } else {
                console.error(`Error with -- ${product} -- product`)
              }
            }
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return { fetched }
}
