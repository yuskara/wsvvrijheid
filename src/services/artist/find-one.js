import { useQuery } from 'react-query'

import { request } from '~lib'

export const getArtist = async (locale, username) => {
  const response = await request({
    url: 'api/arts',
    // filters: { user: { username: { $eq: username } }, arts: { locale: { $eq: locale } } },
    filters: { artist: { user: { username: { $eq: username } } } },
    populate: ['user.avatar', 'arts'],
    locale,
  })

  return response.result?.[0] || null
}

export const useGetArtist = (locale, username) =>
  useQuery({
    queryKey: ['artists', locale, username],
    queryFn: () => getArtist(locale, username),
  })
