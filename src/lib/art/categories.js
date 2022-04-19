import { request } from '~lib'

export const getArtCategories = async locale => {
  const allCategories = await request({
    url: 'api/categories',
    pageSize: 100,
    locale,
  })

  return allCategories.result.filter(category => category.arts?.some(art => art.locale === locale))
}
