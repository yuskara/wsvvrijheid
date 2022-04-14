import { Avatar, Box, Center, Heading, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ChakraNextImage, Container, HomeHero, Layout } from '~components'
import { PROJECTS } from '~data'

export default function Home() {
  const { t } = useTranslation()
  const { locale } = useRouter()

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
      <Center bg='blue.100' py={{ base: 16, lg: 32 }} minH='50vh'>
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
      </Center>
      <Center py={{ base: 16, lg: 32 }} minH='50vh' bg='samen.100'>
        <Container>
          <SimpleGrid columns={{ base: 1, lg: 2 }} justifyItems='center'>
            <ChakraNextImage
              image={PROJECTS.samenvvv.image}
              boxSize={200}
              nextImageProps={{ width: 200, height: 200 }}
            />
            <Stack spacing={4}>
              <Heading color='samen.500'>{PROJECTS.samenvvv.title[locale]}</Heading>
              <Text>{PROJECTS.samenvvv.description[locale]}</Text>
            </Stack>
          </SimpleGrid>
        </Container>
      </Center>
      <Center py={{ base: 16, lg: 32 }} minH='50vh' bg='black'>
        <Container>
          <SimpleGrid columns={{ base: 1, lg: 2 }} justifyItems='center'>
            <ChakraNextImage
              order={2}
              image={PROJECTS.lotus.image}
              boxSize={200}
              nextImageProps={{ width: 200, height: 200 }}
            />
            <Stack order={1} spacing={4}>
              <Heading color='white'>{PROJECTS.lotus.title[locale]}</Heading>
              <Text color='white'>{PROJECTS.lotus.description[locale]}</Text>
            </Stack>
          </SimpleGrid>
        </Container>
      </Center>
      <Center py={{ base: 16, lg: 32 }} minH='50vh' bg='red.100'>
        <Container>
          <SimpleGrid columns={{ base: 1, lg: 2 }} justifyItems='center'>
            <ChakraNextImage
              image={PROJECTS.kunsthalte.image}
              boxSize={200}
              nextImageProps={{ width: 200, height: 200 }}
            />
            <Stack spacing={4}>
              <Heading color='red.500'>{PROJECTS.kunsthalte.title[locale]}</Heading>
              <Text>{PROJECTS.kunsthalte.description[locale]}</Text>
            </Stack>
          </SimpleGrid>
        </Container>
      </Center>
      <Center py={{ base: 16, lg: 32 }} minH='50vh' bg='blue.100'>
        <Container>
          <SimpleGrid columns={{ base: 1, lg: 2 }} justifyItems='center'>
            <ChakraNextImage
              order={2}
              image={PROJECTS.academy.image}
              boxSize={200}
              nextImageProps={{ width: 200, height: 200 }}
            />
            <Stack order={1} spacing={4}>
              <Heading color='blue.500'>{PROJECTS.academy.title[locale]}</Heading>
              <Text>{PROJECTS.academy.description[locale]}</Text>
            </Stack>
          </SimpleGrid>
        </Container>
      </Center>
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
