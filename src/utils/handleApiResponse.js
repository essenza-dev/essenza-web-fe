export const handleApiResponse = async (apiCall, { success, error }) => {
  try {
    const res = await apiCall()

    if (res?.status === 200 || res?.status === 201 || res?.success) {
      success(res.message || 'Action completed successfully!')
      return res.data || res
    } else {
      error(res?.message || 'Unexpected API response')
      throw new Error(res?.message || 'Unexpected API response')
    }
  } catch (err) {
    console.error('❌ API Error:', err)
    const msg = err?.response?.data?.message || err?.message || 'Something went wrong. Please try again.'
    error(msg)
    throw err
  }
}
