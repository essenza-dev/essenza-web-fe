import { notFound } from 'next/navigation'

import { getPubArticleBySlug } from '@/services/article'

async function getData(slug) {
  const url = `https://essenza-backend.warawiri.web.id/pub/v1/articles${slug}`

  let res
  try {
    res = await fetch(url, {
      cache: 'no-store'
    })
  } catch (networkError) {
    console.error('NETWORK FETCH ERROR:', networkError.message)
    throw new Error('Failed to connect to the server.')
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch data. Status: ${res.status}`)
  }

  const data = await res.json()

  if (!data.success) {
    throw new Error(data.message || 'API reported failure.')
  }

  const resData = data?.data
  return {
    ...resData,
    openGraph: {
      title: resData.meta_title || resData.title,
      description: resData.meta_description,
      type: 'article',
      images: [
        {
          url: resData.thumbnail || '/default-thumbnail.jpg',
          alt: resData.title
        }
      ]
    }
  }
}

export default async function NewsDetailPage({ params }) {
  const { slug } = params

  const newsItem = await getData(slug)

  console.log('res', newsItem)

  return (
    <div className='container mx-auto py-10'>
      <h1>{newsItem?.title}</h1>
      <p>Slug: {newsItem?.slug}</p>
      {newsItem?.content && <div dangerouslySetInnerHTML={{ __html: newsItem?.content }} />}
    </div>
  )
}
