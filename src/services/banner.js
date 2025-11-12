import apiClient from '@/utils/apiClient'

const getBanners = async (params = {}) => {
  return await apiClient.get('/banners', { params })
}

const getBannerById = async id => {
  return await apiClient.get(`/banners/${id}`)
}

const createBanner = async data => {
  return await apiClient.post('/banners', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

const updateBanner = async (id, data) => {
  return await apiClient.put(`/banners/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

const deleteBanner = async id => {
  return await apiClient.delete(`/banners/${id}`)
}

export { getBanners, getBannerById, createBanner, updateBanner, deleteBanner }
