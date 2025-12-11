import apiClient from '@/utils/apiClient'

const getStores = async (params = {}) => {
  return await apiClient.get(`/int/v1/stores`, { params })
}

const getStoreById = async id => {
  return await apiClient.get(`/int/v1/stores/${id}`)
}

const createStore = async data => {
  return await apiClient.post(`/int/v1/stores`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

const updateStore = async (id, data) => {
  return await apiClient.put(`/int/v1/stores/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

const deleteStore = async id => {
  return await apiClient.delete(`/int/v1/stores/${id}`)
}

const getPubStores = async (params = {}) => {
  return await apiClient.get(`/pub/v1/stores`, { params })
}

export { getStores, getStoreById, createStore, updateStore, deleteStore, getPubStores }
