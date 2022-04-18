import { Box } from '@chakra-ui/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Layout } from '~components'

import { SignupForm } from '../../components/forms/signup-form'

const Register = ({ seo }) => {
  return (
    <Layout seo={seo}>
      <Box minH='inherit'>
        <SignupForm />
      </Box>
    </Layout>
  )
}

export default Register

export const getStaticProps = async context => {
  const { locale } = context

  const title = {
    en: 'Register',
    tr: 'Kayıt ol',
    nl: 'Inschrijven',
  }

  const description = {
    en: '',
    tr: '',
    nl: '',
  }
  const seo = {
    title: title[locale],
    description: description[locale],
  }
  return {
    props: {
      seo,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
