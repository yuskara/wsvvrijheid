import { Box, Button, Heading, Link, Stack, Text, VStack } from '@chakra-ui/react'
import { ContactForm, Container, Layout, SocialButtons } from 'components'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'react-i18next'
import { FaWhatsapp as FaWhatsapp } from 'react-icons/fa'
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md'

const Contact = ({ seo }) => {
  const { t } = useTranslation()

  return (
    <Layout seo={seo}>
      <Box minH='inherit'>
        <Container minH='inherit' maxW='container.xl'>
          <Stack justify='center' align='center' spacing={8} direction={{ base: 'column', lg: 'row' }} minH='inherit'>
            <VStack
              bg='blue.900'
              borderRadius='lg'
              p={{ base: 8, lg: 16 }}
              w={{ base: 'full', lg: '500px' }}
              textAlign='center'
              justify='center'
              spacing={{ base: 8, lg: 16 }}
            >
              <Box>
                <Heading>{t('contact.title')}</Heading>
                <Text mt={{ sm: 3, md: 3, lg: 5 }} color='blue.50'>
                  {t('contact.fill-form')}
                </Text>
              </Box>
              <VStack alignItems='flex-start' color='blue.50'>
                <Button
                  as={Link}
                  isExternal
                  borderWidth={2}
                  borderColor='transparent'
                  variant='ghost'
                  _hover={{ borderColor: 'blue.500' }}
                  leftIcon={<Box as={MdPhone} color='blue.500' size='20px' />}
                  href='tel:+31685221308'
                >
                  +31-6 85221308
                </Button>
                <Button
                  as={Link}
                  isExternal
                  borderWidth={2}
                  borderColor='transparent'
                  variant='ghost'
                  _hover={{ borderColor: 'blue.500' }}
                  leftIcon={<Box as={FaWhatsapp} color='blue.500' size='20px' />}
                  href='https://api.whatsapp.com/send?phone=31685221308'
                >
                  {t('contact.form.contactOnWhatsApp')}
                </Button>
                <Button
                  as={Link}
                  isExternal
                  borderWidth={2}
                  borderColor='transparent'
                  variant='ghost'
                  _hover={{ borderColor: 'blue.500' }}
                  leftIcon={<Box as={MdEmail} color='blue.500' size='20px' />}
                  href='mailto:info@wsvvrijheid.nl'
                >
                  info@wsvvrijheid.nl
                </Button>
                <Button
                  as={Link}
                  isExternal
                  borderWidth={2}
                  borderColor='transparent'
                  variant='ghost'
                  _hover={{ borderColor: 'blue.500' }}
                  leftIcon={<Box as={MdLocationOn} color='blue.500' size='20px' />}
                  href='https://goo.gl/maps/E9HaayQnXmphUWtN8'
                >
                  Tandersplein 1, 3027 CN <br /> Rotterdam, Netherland
                </Button>
              </VStack>

              <SocialButtons />
            </VStack>
            <Box w={{ base: 'full', lg: '500px' }} bg='white' rounded='lg' p={{ base: 8, lg: 16 }} shadow='lg'>
              <ContactForm />
            </Box>
          </Stack>
        </Container>
      </Box>
    </Layout>
  )
}

export default Contact

export const getStaticProps = async context => {
  const { locale } = context

  const title = {
    en: 'Contact',
    tr: 'İletişim',
    nl: 'Contact',
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
