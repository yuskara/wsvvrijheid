import qs from 'qs'
import { useQuery } from 'react-query'

import { request } from '~lib'

export const getArts = async ({
  categories,
  populate = ['artist.user.avatar', 'categories', 'images'],
  page = 1,
  pageSize,
  searchTerm,
  sort,
  locale,
}) => {
  let filters = {}

  const searchFilter = {
    $or: [
      {
        artist: {
          user: {
            username: {
              $containsi: searchTerm,
            },
          },
        },
      },
      {
        title: {
          $containsi: searchTerm,
        },
      },
    ],
  }

  const categoryObj = qs.parse(categories)

  if (categoryObj?.[0]) {
    filters = { ...(searchFilter || {}), categories: { code: { $in: Object.values(categoryObj) } } }
  }

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

export const useArts = (queryKey, args) =>
  useQuery({
    queryKey,
    queryFn: () => getArts(args),
  })
