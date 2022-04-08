import { Box } from '@chakra-ui/react'

import { Layout } from '~components'
import { Login } from '~components'

const LoginPage = ({ seo }) => {
  return (
    <Layout seo={seo}>
      <Box minH='inherit'>
        <Login />
      </Box>
    </Layout>
  )
}

export default LoginPage
