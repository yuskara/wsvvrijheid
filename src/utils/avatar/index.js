export const getAvatarUrl = volunteersDataAvatar => {
  const avatarData = volunteersDataAvatar?.map(att => att.attributes.user.data.attributes.avatar.data)
  const avatarUrl = avatarData?.map(el => el?.attributes.url)

  return avatarUrl
}
