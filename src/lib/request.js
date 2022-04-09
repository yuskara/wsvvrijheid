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
  post: async (url, data) => {
    const response = await fetcher.post(`/${url}`, data)
    return transformStrapiData(response.data).result
  },
  put: async (url, id, data) => {
    const response = await fetcher.put(`/${url}/${id}`, data)
    return transformStrapiData(response.data).result
  },
  delete: async (url, id) => {
    const response = await fetcher.delete(`/${url}/${id}`)
    return transformStrapiData(response.data).result
  },
  // https://docs.strapi.io/developer-docs/latest/plugins/i18n.html#creating-a-localization-for-an-existing-entry
  localize: async (url, id, data) => {
    const response = fetcher.post(`/${url}/${id}/localization`, data)
    return transformStrapiData(response.data).result
  },
}
