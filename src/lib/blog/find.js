import { request } from '../request'

export const getBlog = async (locale, slug) => {
  const response = await request({
    url: 'api/blogs',
    filters: { slug: { $eq: slug } },
    locale,
  })

  return response.result?.[0] || null
}
