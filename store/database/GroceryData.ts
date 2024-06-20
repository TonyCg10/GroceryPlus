import { PRODUCT, URL } from '../../express/utils'

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
      if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`)
      }
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
        let res = 0

        const productListResponse = await axios.get(`${URL}/${PRODUCT}/get-products`)
        const productList = productListResponse.data.products

        if (productList.length > 0) {
          return
        }

        for (const product of productList) {
          const productId = product.id

          const checkProductResponse = await axios.get(
            `${URL}/${PRODUCT}/check-single/${productId}`
          )

          console.log('#####')
          console.log(checkProductResponse.data.data)
          console.log('#####')

          res = checkProductResponse.status
        }

        if (res === 404 || res === 0) {
          for (const product of data) {
            try {
              const addProductResponse = await axios.post(
                `${URL}/${PRODUCT}/create-product`,
                product
              )

              console.log('#####')
              console.log(addProductResponse.data.data)
              console.log('#####')

              if (addProductResponse.status === 200) {
                console.log(`Product -- ${product} -- added`)
              } else {
                console.error(`Error with -- ${product} -- product`)
              }
            } catch (error) {
              console.error(`Error adding product: ${error}`)
            }
          }
        } else {
          console.log('#####')
          console.log('All products already in')
          console.log('#####')
        }
      } catch (error) {
        console.error('Error fetching product list:', error)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return { fetched }
}
