import apiClient from '@/utils/apiClient'

const getDistributors = async (params = {}) => {
  return await apiClient.get('/distributors', { params })
}

const getDistributorById = async id => {
  return await apiClient.get(`/distributors/${id}`)
}

const createDistributor = async data => {
  return await apiClient.post('/distributors', data)
}

const updateDistributor = async (id, data) => {
  return await apiClient.put(`/distributors/${id}`, data)
}

const deleteDistributor = async id => {
  return await apiClient.delete(`/distributors/${id}`)
}

export { getDistributors, getDistributorById, createDistributor, updateDistributor, deleteDistributor }
