import { Avatar, Box, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Container, HomeHero, Layout } from '~components'

export default function Home() {
  return (
    <Layout>
      <Box flexDir='column' minH='inherit' bg='gray.100'>
        <Container>
          <VStack py={16} spacing={4} textAlign='center'>
            <Heading fontWeight='black'>Wees de Stem Voor Vrijheid</Heading>
            <Text fontSize='xl'>Evrensel hukuk karşısında herkes eşittir.</Text>
            <Text fontSize='xl'>
              Evrensel insan haklarından herkesin eşit şekilde faydalanması için çalışmalar yapıyoruz.
            </Text>
          </VStack>
          <HomeHero />
        </Container>
        <Box bg='blue.100' py={16}>
          <Container>
            <SimpleGrid columns={{ base: 1, lg: 3 }} gap={8}>
              <VStack spacing={4}>
                <Avatar size='2xl' src='/images/who-we-are.svg' />
                <Text fontSize='xl' fontWeight='semibold'>
                  Biz Kimiz?
                </Text>
                <Text>
                  Hukukun üstünlüğünü, demokrasi ve insan haklarını destekleyen, Hollanda’da yaşayan çeşitli meslek
                  sahibi gönüllüler tarafından kurulmuştur.
                </Text>
              </VStack>
              <VStack spacing={4}>
                <Avatar size='2xl' src='/images/mission.svg' />
                <Text fontSize='xl' fontWeight='semibold'>
                  Misyon
                </Text>
                <Text>
                  Dünyanın farklı coğrafyalarında kişiler veya devletler tarafından işlenen insan hakları ihlallerinin
                  azalması veya son bulması için çalışmalar yapmak.
                </Text>
              </VStack>
              <VStack spacing={4}>
                <Avatar size='2xl' src='/images/vision.svg' />
                <Text fontSize='xl' fontWeight='semibold'>
                  Vizyon
                </Text>
                <Text>İnsan hakları ihlalleri kamuoyuna paylaşıldıkça ihlaller azalacak veya sona erecektir.</Text>
              </VStack>
            </SimpleGrid>
          </Container>
        </Box>
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
