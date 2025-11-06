import 'server-only'

const dictionaries = {
  id: () => import('@/data/dictionaries/id.json').then(m => m.default),
  en: () => import('@/data/dictionaries/en.json').then(m => m.default)
}

/**
 * Get dictionary by locale.
 * If locale is not provided (e.g. esse-panel routes), default to 'id'
 */
export const getDictionary = async (locale = 'id') => {
  const loadDictionary = dictionaries[locale] || dictionaries.id
  return loadDictionary()
}
