import apiClient from '@/utils/apiClient'

const getSocialMedias = async (params = {}) => {
  return await apiClient.get('/int/v1/social-media', { params })
}

const createSocialMedia = async data => {
  return await apiClient.post('/int/v1/social-media', data)
}

const getSocialMediaById = async id => {
  return await apiClient.get(`/int/v1/social-media/${id}`)
}

const updateSocialMedia = async (id, data) => {
  return await apiClient.patch(`/int/v1/social-media/${id}`, data)
}

const deleteSocialMedia = async id => {
  return await apiClient.delete(`/int/v1/social-media/${id}`)
}

const getPubSocialMedias = async (params = {}) => {
  return await apiClient.get('/pub/v1/social-media', { params })
}

export {
  getSocialMedias,
  createSocialMedia,
  getSocialMediaById,
  updateSocialMedia,
  deleteSocialMedia,
  getPubSocialMedias
}
