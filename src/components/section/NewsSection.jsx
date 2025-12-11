'use client'

import { useState, useEffect } from 'react'

import { useParams } from 'next/navigation'

import CardCarousel from '@/components/CardCarousel'

import { getPubArticles } from '@/services/article'

const NewsSection = () => {
  const { lang: locale } = useParams()

  const [articles, setArticles] = useState([])

  const fetchArticles = async () => {
    const res = await getPubArticles()

    if (res?.data.length > 0) {
      const mappingArticles = res?.data.map(item => {
        return {
          ...item,
          href: `/${locale}/news/${item?.slug}`,
          src: item?.thumbnail
        }
      })

      setArticles(mappingArticles)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  return <CardCarousel data={articles} title='News & Event' duration={1500} />
}

export default NewsSection
