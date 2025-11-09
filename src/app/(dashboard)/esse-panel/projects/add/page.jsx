'use client'

import { useRouter } from 'next/navigation'

import ProjectsForm from '@/components/dashboards/projects/Form'

const ProjectsAddPage = () => {
  const router = useRouter()

  const handleSubmit = e => {}

  return <ProjectsForm onCancel={() => router.push('/esse-panel/projects')} onSubmit={handleSubmit} />
}

export default ProjectsAddPage
