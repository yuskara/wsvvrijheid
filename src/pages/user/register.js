import { Box } from '@chakra-ui/react'

import { Layout } from '~components'

import { SignUp } from '../../components/sign-up'

const Register = ({ seo }) => {
  return (
    <Layout seo={seo}>
      <Box minH='inherit'>
        <SignUp />
      </Box>
    </Layout>
  )
}

export default Register
