'use client'

import { useRouter } from 'next/navigation'

import BannersForm from '@/components/dashboards/banners/Form'

const BannersEditPage = () => {
  const router = useRouter()

  const handleSubmit = e => {}

  return <BannersForm onCancel={() => router.push('/esse-panel/banners')} onSubmit={handleSubmit} />
}

export default BannersEditPage
