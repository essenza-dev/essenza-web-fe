import apiClient from '@/utils/apiClient'

const createMenu = async data => {
  return await apiClient.post('/int/v1/menus', data)
}

const getMenus = async (params = {}) => {
  return await apiClient.get('/int/v1/menus', { params })
}

const getMenuById = async id => {
  return await apiClient.get(`/int/v1/menus/${id}`)
}

const updateMenu = async (id, data) => {
  return await apiClient.patch(`/int/v1/menus/${id}`, data)
}

const deleteMenu = async id => {
  return await apiClient.delete(`/int/v1/menus/${id}`)
}

const createMenuItem = async data => {
  return await apiClient.post('/int/v1/menus', data)
}

const getMenusItem = async (params = {}) => {
  return await apiClient.get('/int/v1/menus', { params })
}

const getMenuByIdItem = async id => {
  return await apiClient.get(`/int/v1/menus/${id}`)
}

const updateMenuItem = async (id, data) => {
  return await apiClient.patch(`/int/v1/menus/${id}`, data)
}

const deleteMenuItem = async id => {
  return await apiClient.delete(`/int/v1/menus/${id}`)
}

const getMenuItemsByMenuId = async menuId => {
  return await apiClient.get(`/int/v1/menus/${menuId}/items`)
}

export {
  createMenu,
  getMenus,
  getMenuById,
  updateMenu,
  deleteMenu,
  getMenuItemsByMenuId,
  createMenuItem,
  getMenusItem,
  getMenuByIdItem,
  updateMenuItem,
  deleteMenuItem
}
