import { Box } from '@chakra-ui/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

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

export const getStaticProps = async context => {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
