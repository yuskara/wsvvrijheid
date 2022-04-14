import { Avatar, Box, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Container, HomeHero, Layout } from '~components'

export default function Home() {
  const { t } = useTranslation()

  return (
    <Layout>
      <Box minH='inherit' bg='gray.100'>
        <Container maxW='container.md'>
          <VStack flex={1} py={16} spacing={4} textAlign='center'>
            <Heading fontWeight='black'>Wees de Stem voor Vrijheid</Heading>
            <Text fontSize='xl'>{t`home.hero`}</Text>
          </VStack>
        </Container>
        <Box overflow='hidden'>
          <HomeHero />
        </Box>
      </Box>
      <Box bg='blue.100' py={{ base: 16, lg: 32 }}>
        <Container>
          <SimpleGrid columns={{ base: 1, lg: 3 }} gap={8} textAlign='center'>
            <VStack spacing={4}>
              <Avatar size='2xl' src='/images/who-we-are.svg' />
              <Text fontSize='xl' fontWeight='semibold'>
                {t`home.about.who-we-are.title`}
              </Text>
              <Text>{t`home.about.who-we-are.description`}</Text>
            </VStack>
            <VStack spacing={4}>
              <Avatar size='2xl' src='/images/mission.svg' />
              <Text fontSize='xl' fontWeight='semibold'>
                {t`home.about.mission.title`}
              </Text>
              <Text>{t`home.about.mission.description`}</Text>
            </VStack>
            <VStack spacing={4}>
              <Avatar size='2xl' src='/images/vision.svg' />
              <Text fontSize='xl' fontWeight='semibold'>
                <Text>{t`home.about.vision.title`}</Text>
              </Text>
              <Text>
                <Text>{t`home.about.vision.description`}</Text>
              </Text>
            </VStack>
          </SimpleGrid>
        </Container>
      </Box>
    </Layout>
  )
}

export const getStaticProps = async context => {
  const { locale } = context

  const title = {
    en: 'Homepage',
    tr: 'Anasayfa',
    nl: 'Home',
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
