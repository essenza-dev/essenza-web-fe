'use client'

import { useRouter } from 'next/navigation'

import DistributorsForm from '@/components/dashboards/distributors/Form'

const DistributorsAddPage = () => {
  const router = useRouter()

  const handleSubmit = e => {}

  return <DistributorsForm onCancel={() => router.push('/esse-panel/distributors')} onSubmit={handleSubmit} />
}

export default DistributorsAddPage
