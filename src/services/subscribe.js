import apiClient from '@/utils/apiClient'

const getSubscribes = async (params = {}) => {
  return await apiClient.get('/int/v1/subscribers', { params })
}

const subscribeUser = async data => {
  return await apiClient.post('/pub/v1/subscribers', data)
}

export { subscribeUser, getSubscribes }
