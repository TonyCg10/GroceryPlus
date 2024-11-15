import axios from 'axios'

export const fetchProducts = async (filters: { [key: string]: unknown } = {}) => {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/${process.env.PRODUCT_URL}/get-products`,
      {
        params: filters
      }
    )
    console.log('_____')
    console.log('product.service.fetchProducts ===== ', response.data.products)
    console.log('_____')
    return response.data.products
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

export const createProduct = async (info: { [key: string]: unknown }) => {
  try {
    const response = await axios.post(
      `${process.env.API_URL}/${process.env.PRODUCT_URL}/create-product`,
      info
    )
    console.log('_____')
    console.log('product.service.createProduct ===== ', response.data.product)
    console.log('_____')
    return response.data.product
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}
