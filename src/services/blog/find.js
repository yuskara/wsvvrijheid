import { useQuery } from 'react-query'

import { request } from '~lib'

export const getBlogs = async locale =>
  await request({
    url: 'api/blogs',
    locale,
    sort: ['publishedAt:desc'],
  })

export const getAuthorBlogs = async (locale, authorID) => {
  const response = await request({
    url: 'api/blogs',
    filters: { id: { $eq: authorID } },
    locale,
  })

  return response?.result || null
}

export const useGetBlogs = locale =>
  useQuery({
    queryKey: 'blogs',
    queryFn: () => getBlogs(locale),
  })
