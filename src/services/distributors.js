import apiClient from '@/utils/apiClient'

const getDistributors = async (params = {}) => {
  return await apiClient.get('/int/v1/distributors', { params })
}

const getDistributorById = async id => {
  return await apiClient.get(`/int/v1/distributors/${id}`)
}

const createDistributor = async data => {
  return await apiClient.post('/int/v1/distributors', data)
}

const updateDistributor = async (id, data) => {
  return await apiClient.put(`/int/v1/distributors/${id}`, data)
}

const deleteDistributor = async id => {
  return await apiClient.delete(`/int/v1/distributors/${id}`)
}

export { getDistributors, getDistributorById, createDistributor, updateDistributor, deleteDistributor }
