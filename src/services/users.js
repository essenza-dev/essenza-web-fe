import apiClient from '@/utils/apiClient'

const getUsers = async (params = {}) => {
  return await apiClient.get(`/int/v1/users`, { params })
}

const getUserRoles = async (params = {}) => {
  return await apiClient.get(`/int/v1/users/roles`, { params })
}

const getUserById = async id => {
  return await apiClient.get(`/int/v1/users/${id}`)
}

const createUser = async data => {
  return await apiClient.post(`/int/v1/users`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

const updateUser = async (id, data) => {
  return await apiClient.put(`/int/v1/users/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

const deleteUser = async id => {
  return await apiClient.delete(`/int/v1/users/${id}`)
}

export { getUsers, getUserRoles, getUserById, createUser, updateUser, deleteUser }
