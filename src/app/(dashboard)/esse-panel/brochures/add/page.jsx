'use client'

import { useRouter } from 'next/navigation'

import BrochuresForm from '@/components/dashboards/brochures/Form'

const BrochuressAddPage = () => {
  const router = useRouter()

  const handleSubmit = e => {}

  return <BrochuresForm onCancel={() => router.push('/esse-panel/brochures')} onSubmit={handleSubmit} />
}

export default BrochuressAddPage
