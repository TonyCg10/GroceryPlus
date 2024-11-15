import axios from 'axios'

export const fetchUser = async (filters: { [key: string]: unknown } = {}) => {
  try {
    const response = await axios.get(`${process.env.API_URL}/${process.env.USER_URL}/get-users`, {
      params: filters
    })
    console.log('_____')
    console.log('user.service.fetchUsers ===== ', response.data.users)
    console.log('_____')
    return !filters ? response.data.users : response.data.users[0]
  } catch (error) {
    console.error('Error fetching user:', error)
    throw error
  }
}

export const createUser = async (info: { [key: string]: unknown }) => {
  try {
    const response = await axios.post(
      `${process.env.API_URL}/${process.env.USER_URL}/create-user`,
      info
    )
    console.log('_____')
    console.log('user.service.createUser ===== ', response.data.user)
    console.log('_____')
    return response.data.user
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

export const updateUser = async (data: { [key: string]: unknown }, id: string) => {
  try {
    const response = await axios.put(
      `${process.env.API_URL}/${process.env.USER_URL}/update-user/${id}`,
      data
    )
    console.log('_____')
    console.log('user.service.updateUser ===== ', response.data.user)
    console.log('_____')
    return response.data.user
  } catch (error) {
    console.error('Error updating user:', error)
    throw error
  }
}
