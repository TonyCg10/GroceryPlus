import axios from 'axios'

export const fetchProducts = async (filters: { [key: string]: unknown } = {}) => {
  try {
    console.log('===== Request Log =====')
    console.log('Endpoint:', '/get-products')
    console.log('Filters:', JSON.stringify(filters, null, 2))
    console.log('=======================')

    const response = await axios.post(
      `${process.env.API_URL}/${process.env.PRODUCT_URL}/get-products`,
      filters
    )

    console.log('===== Response Log =====')
    console.log('Status:', response.status)
    console.log('Headers:', JSON.stringify(response.headers, null, 2))
    console.log('Data:', JSON.stringify(response.data, null, 2))
    console.log('========================')

    return response.data.products
  } catch (error: any) {
    console.error('===== Error Log =====')
    if (error.response) {
      console.error('Status:', error.response.status)
      console.error('Headers:', JSON.stringify(error.response.headers, null, 2))
      console.error('Data:', JSON.stringify(error.response.data, null, 2))
    } else if (error.request) {
      console.error('Request:', JSON.stringify(error.request, null, 2))
    } else {
      console.error('Message:', error.message)
    }
    console.error('=====================')

    throw error
  }
}

export const createProduct = async (info: { [key: string]: unknown }) => {
  try {
    console.log('===== Request Log (Create Product) =====')
    console.log('Endpoint:', '/create-product')
    console.log('Payload:', JSON.stringify(info, null, 2))
    console.log('====================================')

    const response = await axios.post(
      `${process.env.API_URL}/${process.env.PRODUCT_URL}/create-product`,
      info
    )

    console.log('===== Response Log (Create Product) =====')
    console.log('Status:', response.status)
    console.log('Headers:', JSON.stringify(response.headers, null, 2))
    console.log('Data:', JSON.stringify(response.data, null, 2))
    console.log('=====================================')

    return response.data.product
  } catch (error: any) {
    console.error('===== Error Log (Create Product) =====')
    if (error.response) {
      console.error('Status:', error.response.status)
      console.error('Headers:', JSON.stringify(error.response.headers, null, 2))
      console.error('Data:', JSON.stringify(error.response.data, null, 2))
    } else if (error.request) {
      console.error('Request:', JSON.stringify(error.request, null, 2))
    } else {
      console.error('Message:', error.message)
    }
    console.error('====================================')
    throw error
  }
}
