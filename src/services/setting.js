import apiClient from '@/utils/apiClient'

const updateGeneralSetting = async (id, data) => {
  return await apiClient.put(`/projects/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

const updateSocialMedia = async (id, data) => {
  return await apiClient.put(`/projects/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export { updateGeneralSetting, updateSocialMedia }
