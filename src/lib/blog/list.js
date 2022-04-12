import { request } from '../request'

export const getBlogs = async locale =>
  await request({
    url: 'api/blogs',
    locale,
    sort: ['publishedAt:desc'],
  })
