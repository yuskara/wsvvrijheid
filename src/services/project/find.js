import { request } from '~lib'

export const getProject = async (locale, code) => {
  const response = await request({
    url: 'api/projects',
    filters: { code: { $eq: code } },
    locale,
  })

  return response.result?.[0] || null
}
