import {
  Avatar,
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Stack,
  StackDivider,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import axios from 'axios'
import { Container } from 'components/layout/container'
import { Layout } from 'components/layout/layout'
import { UserCard } from 'components/UserCard'
import { UserFilter } from 'components/UserCard/UserFilter'
import { VolunteerHeader } from 'components/VolunteerHeader'
import { VolunterApplyCard } from 'components/VolunteerHeader/VolenterApplyCard'
import { useTranslation } from 'react-i18next'

import { request } from '../lib/request'

export default function Volunteers({ volunteers, volunteersApi, volunteersData }) {
  const { t } = useTranslation()

  return (
    <Layout>
      <Box minH='inherit'>
        <Container minH='inherit' maxW='container.xl'>
          <VolunteerHeader />
          <HStack>
            {' '}
            <Text>
              {t('contributors.filter')} {volunteersData?.data.length}
            </Text>
          </HStack>
          <HStack p={8} spacing={2} flex={1}>
            {volunteersData.data?.map((el, i) => (
              <UserFilter key={i} volunteers={el} />
            ))}
          </HStack>
          <HStack p={8} margin={10} spacing={2} flex={1}>
            <VolunterApplyCard />
            {volunteersData.data?.map((attributes, i) => (
              <UserCard key={i} user={attributes} />
            ))}
          </HStack>
        </Container>
      </Box>
    </Layout>
  )
}
export const getStaticProps = async context => {
  const { locale } = context

  // const volunteersApi = await request({ url: 'api/volunteers' })//returning null ??????
  const response = await axios.get('https://api.samenvvv.nl/api/volunteers?populate=*')
  const volunteersData = response.data

  const volunteers = [
    {
      name: 'Talip Altas',
      email: 'talipaltas@gmail.com',
      phone: '000',
      country: 'Netherlands',
      occupation: 'Developer',
      available_hours: 1,
      subjects: ['translator', 'blog_writer', 'twitter_analyst', 'seo_analyst', 'art_creator', 'web_developer'],
      donator: false,
      in_mailing_list: false,
      heard_from: ['whatsapp', 'email', 'friends', 'web', 'other'],
      comment: 'Hello!',
      show_in_website: true,
      approved: false,
      avatar:
        'https://i0.wp.com/www.cssscript.com/wp-content/uploads/2020/12/Customizable-SVG-Avatar-Generator-In-JavaScript-Avataaars.js.png?resize=200%2C140&ssl=1',
    },
    {
      name: 'Mustafa',
      email: 'mustafa@gmail.com',
      phone: '000',
      country: 'Netherlands',
      occupation: 'Editor',
      available_hours: 1,
      subjects: ['translator', 'blog_writer', 'twitter_analyst', 'seo_analyst', 'art_creator', 'web_developer'],
      donator: false,
      in_mailing_list: false,
      heard_from: ['whatsapp', 'email', 'friends', 'web', 'other'],
      comment: 'Hello!',
      show_in_website: true,
      approved: false,
      avatar: 'https://miro.medium.com/max/566/1*n-FPAObgPCDmxNKeGqyWvw.jpeg',
    },
    {
      name: 'Dursun',
      email: 'dursun@gmail.com',
      phone: '000',
      country: 'Netherlands',
      occupation: 'Author',
      available_hours: 1,
      subjects: ['translator', 'blog_writer', 'twitter_analyst', 'seo_analyst', 'art_creator', 'web_developer'],
      donator: false,
      in_mailing_list: false,
      heard_from: ['whatsapp', 'email', 'friends', 'web', 'other'],
      comment: 'Hello!',
      show_in_website: true,
      approved: false,
      avatar: 'https://yamsoti.com/wp-content/uploads/2020/01/avatar-rectangle.png',
    },
  ]

  /*
        const seo = {
            title: volunteers[0]?.name,
            description: volunteers[0]?.occupation,
        }
    */
  return {
    props: {
      volunteers,
      //  volunteersApi,
      volunteersData,
    },
  }
}
