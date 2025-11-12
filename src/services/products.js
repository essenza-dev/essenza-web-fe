import apiClient from '@/utils/apiClient'

const getProducts = async (params = {}) => {
  return await apiClient.get(`/products`, { params })
}

const getProductById = async id => {
  return await apiClient.get(`/products/${id}`)
}

const createProduct = async data => {
  return await apiClient.post(`/products`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

const updateProduct = async (id, data) => {
  return await apiClient.put(`/products/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

const deleteProduct = async id => {
  return await apiClient.delete(`/products/${id}`)
}

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct }
