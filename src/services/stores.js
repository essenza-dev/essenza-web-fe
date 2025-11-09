import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

const getStores = async (params = {}) => {
  try {
    const res = await axios.get(`${API_URL}/stores`, { params })
    return res.data
  } catch (error) {
    console.error('❌ Error fetching Stores:', error)
    throw error
  }
}

const getStoreById = async id => {
  try {
    const res = await axios.get(`${API_URL}/stores/${id}`)
    return res.data
  } catch (error) {
    console.error(`❌ Error fetching Store ${id}:`, error)
    throw error
  }
}

const createStore = async data => {
  try {
    const res = await axios.post(`${API_URL}/stores`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return res.data
  } catch (error) {
    console.error('❌ Error creating Store:', error)
    throw error
  }
}

const updateStore = async (id, data) => {
  try {
    const res = await axios.post(`${API_URL}/stores/${id}?_method=PUT`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return res.data
  } catch (error) {
    console.error(`❌ Error updating Store ${id}:`, error)
    throw error
  }
}

const deleteStore = async id => {
  try {
    const res = await axios.delete(`${API_URL}/stores/${id}`)
    return res.data
  } catch (error) {
    console.error(`❌ Error deleting Store ${id}:`, error)
    throw error
  }
}

export { getStores, getStoreById, createStore, updateStore, deleteStore }
