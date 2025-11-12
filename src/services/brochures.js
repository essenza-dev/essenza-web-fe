import apiClient from '@/utils/apiClient'

const getBrochures = async (params = {}) => {
  return await apiClient.get(`/brochures`, { params })
}

const getBrochureById = async id => {
  return await apiClient.get(`/brochures/${id}`)
}

const createBrochure = async data => {
  return await apiClient.post(`/brochures`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

const updateBrochure = async (id, data) => {
  return await apiClient.post(`/brochures/${id}?_method=PUT`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

const deleteBrochure = async id => {
  return await apiClient.delete(`/brochures/${id}`)
}

export { getBrochures, getBrochureById, createBrochure, updateBrochure, deleteBrochure }
