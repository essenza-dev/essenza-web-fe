'use client'

import { useRouter } from 'next/navigation'

import StoresForm from '@/components/dashboards/stores/Form'

const StoresEditPage = () => {
  const router = useRouter()

  const handleSubmit = e => {}

  return <StoresForm onCancel={() => router.push('/esse-panel/stores')} onSubmit={handleSubmit} />
}

export default StoresEditPage
