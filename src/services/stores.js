import apiClient from '@/utils/apiClient'

const getStores = async (params = {}) => {
  return await apiClient.get(`/stores`, { params })
}

const getStoreById = async id => {
  return await apiClient.get(`/stores/${id}`)
}

const createStore = async data => {
  return await apiClient.post(`/stores`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

const updateStore = async (id, data) => {
  return await apiClient.post(`/stores/${id}?_method=PUT`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

const deleteStore = async id => {
  return await apiClient.delete(`/stores/${id}`)
}

export { getStores, getStoreById, createStore, updateStore, deleteStore }
