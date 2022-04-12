import { request } from '~lib'

export const getArts = async ({
  category,
  populate = ['artist.user', 'categories', 'images'],
  page = 1,
  pageSize,
  sort,
  locale,
}) => {
  const filters = category && { categories: { code: { $eq: category } } }

  return request({
    url: 'api/arts',
    filters,
    page,
    pageSize,
    sort,
    locale,
    populate,
  })
}
