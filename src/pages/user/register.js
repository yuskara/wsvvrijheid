import { Box } from '@chakra-ui/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

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

export const getStaticProps = async context => {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
