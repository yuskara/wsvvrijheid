import axios from 'axios'
import qs from 'qs'

import { transformStrapiData } from '~utils'

export const fetcher = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
  },
})

export const request = async ({
  publicationState = 'live',
  locale,
  url,
  filters,
  sort,
  populate = '*',
  page = 1,
  pageSize = 10,
}) => {
  const query = qs.stringify(
    {
      publicationState,
      locale,
      filters,
      sort,
      populate,
      pagination: {
        page,
        pageSize,
      },
    },
    {
      encodeValuesOnly: true,
    },
  )

  // TODO Consider a better error handling
  try {
    const response = await fetcher.get(`/${url}?${query}`)
    return transformStrapiData(response.data)
  } catch (error) {
    console.error(error.data || error.response || error.message)
    return null
  }
}

export const mutation = {
  post: async (url, data) => fetcher.post(`/${url}`, data),
  put: async (url, id, data) => fetcher.put(`/${url}/${id}`, data),
  delete: async (url, id) => fetcher.delete(`/${url}/${id}`),
  // https://docs.strapi.io/developer-docs/latest/plugins/i18n.html#creating-a-localization-for-an-existing-entry
  localize: async (url, id, data) => fetcher.post(`/${url}/${id}/localization`, data),
}
