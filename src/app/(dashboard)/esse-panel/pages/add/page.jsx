'use client'

import { useRouter } from 'next/navigation'

import PagesForm from '@/components/dashboards/pages/Form'

const PagesAddPage = () => {
  const router = useRouter()

  const handleSubmit = e => {}

  return <PagesForm onCancel={() => router.push('/esse-panel/pages')} onSubmit={handleSubmit} />
}

export default PagesAddPage
