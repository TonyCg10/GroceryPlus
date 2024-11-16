import axios from 'axios'

export const fetchUser = async (filters: { [key: string]: unknown } = {}) => {
  try {
    console.log('===== Request Log =====')
    console.log('Endpoint:', '/get-users')
    console.log('Filters:', JSON.stringify(filters, null, 2))
    console.log('=======================')

    const response = await axios.post(
      `${process.env.API_URL}/${process.env.USER_URL}/get-users`,
      filters
    )

    console.log('===== Response Log =====')
    console.log('Status:', response.status)
    console.log('Headers:', JSON.stringify(response.headers, null, 2))
    console.log('Data:', JSON.stringify(response.data, null, 2))
    console.log('========================')

    return response.data.users
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

export const createUser = async (info: { [key: string]: unknown }) => {
  try {
    console.log('===== Request Log (Create User) =====')
    console.log('Endpoint:', '/create-user')
    console.log('Payload:', JSON.stringify(info, null, 2))
    console.log('====================================')

    const response = await axios.post(
      `${process.env.API_URL}/${process.env.USER_URL}/create-user`,
      info
    )

    console.log('===== Response Log (Create User) =====')
    console.log('Status:', response.status)
    console.log('Headers:', JSON.stringify(response.headers, null, 2))
    console.log('Data:', JSON.stringify(response.data, null, 2))
    console.log('=====================================')

    return response.data.user
  } catch (error: any) {
    console.error('===== Error Log (Create User) =====')
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

export const updateUser = async (data: { [key: string]: unknown }, id: string) => {
  try {
    console.log('===== Request Log (Update User) =====')
    console.log('Endpoint:', '/update-user')
    console.log('Payload:', JSON.stringify(data, null, 2))
    console.log('====================================')

    const response = await axios.put(
      `${process.env.API_URL}/${process.env.USER_URL}/update-user/${id}`,
      data
    )

    console.log('===== Response Log (Update User) =====')
    console.log('Status:', response.status)
    console.log('Headers:', JSON.stringify(response.headers, null, 2))
    console.log('Data:', JSON.stringify(response.data, null, 2))
    console.log('=====================================')

    return response.data.user
  } catch (error: any) {
    console.error('===== Error Log (Update User) =====')
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
