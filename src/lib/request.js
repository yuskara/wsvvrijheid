import axios from 'axios'
import qs from 'qs'

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
  },
})

export const request = async ({ locale, url, filters, populate }) => {
  const query = qs.stringify(
    {
      locale,
      populate: populate || '*',
      filters,
    },
    {
      encodeValuesOnly: true,
    },
  )

  // TODO Consider a better error handling
  try {
    const response = await instance.get(`/${url}?${query}`)
    return response.data
  } catch (error) {
    console.error(error.data ? error.data | error.response && error.response : error.message)
    return null
  }
}

export const mutate = async ({ locale = 'en', url, id, method = 'post', data }) => {
  instance[method](`/${url}/${id}?${locale}`, data)
}
