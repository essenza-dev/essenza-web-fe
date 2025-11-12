import apiClient from '@/utils/apiClient'

const getPages = async (params = {}) => {
  return await apiClient.get(`/pages`, { params })
}

const getPageById = async id => {
  return await apiClient.get(`/pages/${id}`)
}

const createPage = async data => {
  return await apiClient.post(`/pages`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

const updatePage = async (id, data) => {
  return await apiClient.put(`/pages/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

const deletePage = async id => {
  return await apiClient.delete(`/pages/${id}`)
}

export { getPages, getPageById, createPage, updatePage, deletePage }
