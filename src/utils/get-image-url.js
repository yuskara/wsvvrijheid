export const getImageUrl = (image, type) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  if (image == null) return ''

  if (typeof image === 'string')
    return image.startsWith('/images') ? `${siteUrl}${image}` : image.startsWith('http') ? image : `${apiUrl}${image}`

  const imagePath = (type && image.formats && image.formats[type].url) || image.url

  return `${apiUrl}${imagePath}`
}
