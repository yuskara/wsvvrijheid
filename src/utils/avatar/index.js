export const getAvatarUrl = volunteersDataAvatar => {
  const avatarData = volunteersDataAvatar?.map(att => att.attributes.user.data.attributes.avatar.data)
  const avatarUrl = avatarData?.map(el => el?.attributes.url)
  const av = avatarData?.map(el => el?.attributes.formats.small.url)
  console.log('avatar Url in get AvatarUrl', avatarUrl)
  console.log('forms', av)

  return avatarUrl
}
