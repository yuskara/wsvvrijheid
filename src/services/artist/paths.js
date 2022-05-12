import { request } from '~lib'

export const getArtistsPaths = async () => {
  const artists = await request({
    url: 'api/artists',
    populate: ['user'],
  })

  const paths = artists?.result.map(artist => ({
    params: { username: artist.user.username },
  }))
  // const deneme = paths.JSON;
  console.log(JSON.stringify(paths))
  return paths

  // (
  //   await Promise.all(
  //     locales.flatMap(async locale => {
  //       const responses = await request({
  //         url: 'api/blogs',
  //         locale,
  //       })
  //       const blogs = responses?.result
  //       return blogs.map(({ slug }) => ({
  //         params: { slug },
  //         locale,
  //       }))
  //     }),
  //   )
  // ).flat()
}
