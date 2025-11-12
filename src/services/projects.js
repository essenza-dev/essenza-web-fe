import apiClient from '@/utils/apiClient'

const getProjects = async (params = {}) => {
  return await apiClient.get(`/projects`, { params })
}

const getProjectById = async id => {
  return await apiClient.get(`/projects/${id}`)
}

const createProject = async data => {
  return await apiClient.post(`/projects`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

const updateProject = async (id, data) => {
  return await apiClient.post(`/projects/${id}?_method=PUT`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

const deleteProject = async id => {
  return await apiClient.delete(`/projects/${id}`)
}

export { getProjects, getProjectById, createProject, updateProject, deleteProject }
