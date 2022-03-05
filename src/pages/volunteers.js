import { Box, HStack, Text } from '@chakra-ui/react'
import { Container } from 'components/layout/container'
import { Layout } from 'components/layout/layout'
import { UserCard } from 'components/UserCard'
import { UserFilter } from 'components/UserCard/UserFilter'
import { VolunteerHeader } from 'components/VolunteerHeader'
import { VolunterApplyCard } from 'components/VolunteerHeader/VolenterApplyCard'
import { useTranslation } from 'react-i18next'
import { getAvatarUrl } from 'utils/avatar'

import { request } from '../lib/request'

export default function Volunteers({ volunteersData, volunteersDataAvatar }) {
  const { t } = useTranslation()
  const avatarUrl = getAvatarUrl(volunteersDataAvatar)
  //)
  /*
     console.log("Volunteer Data", volunteersData)
    console.log("Volunteer Data Avatar", volunteersDataAvatar)
    console.log("getAvatarUrl() ________________", avatarUrl)
     const avatarData = volunteersDataAvatar.map((att) => att.attributes.user.data.attributes.avatar.data)
    const avatarUrl = avatarData?.map((el) => el?.attributes.url)

    console.log("avatar Url ", avatarUrl)
 
    volunteersDataAvatar.map((attributes) =>
        attributes.user?.map((data) =>
            data.attributes.avatar.data.map((attributes) => attributes.avatar.data.map((att) =>
                console.log("get avatar url >>", att)
            )
            )
        )
    )
       */
  // console.log(getAvatarUrlFirst)

  // console.log(getAvatarUrl)
  return (
    <Layout>
      <Box minH='inherit'>
        <Container minH='inherit' maxW='container.xl'>
          <VolunteerHeader />
          <HStack>
            {' '}
            <Text>
              {t('contributors.filter')} {volunteersData?.length}
            </Text>
          </HStack>
          <HStack p={8} spacing={2} flex={1}>
            {volunteersData?.map((el, i) => (
              <UserFilter key={i} volunteers={el} />
            ))}
          </HStack>
          <HStack p={8} margin={10} spacing={2} flex={1}>
            <VolunterApplyCard />
            {volunteersData?.map((attributes, i) => (
              <UserCard key={i} user={attributes} url={avatarUrl} />
            ))}
          </HStack>
        </Container>
      </Box>
    </Layout>
  )
}
export const getStaticProps = async context => {
  //
  const { locale } = context
  console.log('locale', locale)
  const response = await request({ url: 'api/volunteers' }) //returning null ??????
  const responseAvatar = await request({ url: 'api/volunteers?populate[0]=user.avatar&populate[1]=profile' })
  // https://api.samenvvv.nl/api/volunteers?populate[0]=user.avatar&populate[1]=profile
  //const response = await axios.get('https://api.samenvvv.nl/api/volunteers?populate=*')
  const volunteersData = response.data
  const volunteersDataAvatar = responseAvatar.data

  /*
          const seo = {
              title: volunteers[0]?.name,
              description: volunteers[0]?.occupation,
          }
      */
  return {
    props: {
      //volunteers,
      //  volunteersApi,
      volunteersData,
      volunteersDataAvatar,
    },
  }
}
