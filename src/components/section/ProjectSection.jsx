'use client'

import { useState, useEffect } from 'react'

import { useParams } from 'next/navigation'

import CardCarousel from '@/components/CardCarousel'
import { getPubProjects } from '@/services/projects'

const ProjectSection = () => {
  const { lang: locale } = useParams()
  const [projects, setProjects] = useState([])

  const fetchProjects = async () => {
    const res = await getPubProjects()

    if (res?.data.length > 0) {
      const mappingData = res.data.map(item => {
        return {
          ...item,
          id: item?.slug,
          href: `/${locale}/projects/${item?.slug}`,
          src: item?.image
        }
      })

      setProjects(mappingData)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return (
    <CardCarousel
      data={projects}
      title='Project'
      bgColor={'linear-gradient(180deg, #EDEDED, #F9F9F9)'}
      duration={2500}
    />
  )
}

export default ProjectSection
