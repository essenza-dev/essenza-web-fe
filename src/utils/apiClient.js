import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: { 'Content-Type': 'application/json' }
})

apiClient.interceptors.response.use(
  response => {
    return {
      success: true,
      status: response.status,
      data: response.data,
      message: response.data.message || 'Berhasil'
    }
  },
  error => {
    const errRes = error.response || {}
    return Promise.resolve({
      success: false,
      status: errRes.status || 500,
      message: errRes.data?.message || error.message || 'Terjadi kesalahan, silakan coba lagi'
    })
  }
)

export default apiClient
