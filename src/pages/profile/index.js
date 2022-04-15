import { Stack, StackDivider } from '@chakra-ui/react'
import { withIronSessionSsr } from 'iron-session/next'
import React from 'react'

import { Container, Layout } from '~components'
import { sessionOptions } from '~lib'

import { AuthenticatedUserProfile } from '../../components/layout/user/authenticated-user-profile'

const Profile = () => {
  return (
    <Layout>
      <Container>
        <Stack divider={<StackDivider borderColor='gray.200' />} spacing={4} align='stretch'>
          <AuthenticatedUserProfile />
        </Stack>
      </Container>
    </Layout>
  )
}

export default Profile

export const getServerSideProps = withIronSessionSsr(async function ({ req, locale }) {
  const { serverSideTranslations } = require('next-i18next/serverSideTranslations')
  const user = req.session.user

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/user/login',
      },
      props: {},
    }
  }

  return {
    props: {
      user,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}, sessionOptions)
