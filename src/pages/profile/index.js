import { Code } from '@chakra-ui/react'
import React from 'react'

import { Container, Layout } from '~components'
import { withSession } from '~lib'

const Profile = ({ user }) => {
  return (
    <Layout>
      <Container>
        <pre>
          <Code>{JSON.stringify(user, null, 2)}</Code>
        </pre>
      </Container>
    </Layout>
  )
}

export default Profile

export const getServerSideProps = withSession(context => {
  const { req } = context
  const user = req.session.get('user')
  if (!user)
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {},
    }

  return {
    props: {
      user,
    },
  }
})
