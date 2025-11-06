import { i18n } from '@configs/i18n'
import { ensurePrefix } from '@/utils/string'

export const isUrlMissingLocale = url => {
  return i18n.locales.every(locale => !(url.startsWith(`/${locale}/`) || url === `/${locale}`))
}

export const getLocalizedUrl = (url, languageCode = 'id') => {
  if (!url) throw new Error('URL cannot be empty')

  const lang = languageCode || 'id'

  return isUrlMissingLocale(url) ? `/${lang}${ensurePrefix(url, '/')}` : url
}
