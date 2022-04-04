import { Container } from '@chakra-ui/react'
import { Box, Image } from '@chakra-ui/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

// import Masonry from 'react-masonry-css'
import { Layout, PageTitle } from '~components'

export default function Club({ title, images }) {
  return (
    <Layout scrollHeight={100} seo={{ title }}>
      <Container maxW='100%' centerContent>
        <PageTitle>{title}</PageTitle>
        <Box
          padding={4}
          w='100%'
          mx='auto'
          // bg='gray.800'
          sx={{ columnCount: [1, 2, 3, 4, 5, 6, 7, 8], columnGap: '8px' }}
        >
          {images.map(img => (
            <Image key={img} w='100%' borderRadius='xl' mb={2} d='inline-block' src={img} alt='Alt' />
          ))}
        </Box>
      </Container>
    </Layout>
  )
}

export const getStaticProps = async context => {
  const { locale } = context
  let images = []
  const imgId = [1011, 883, 1074, 823, 64, 65, 839, 314, 256, 316, 92, 643]
  for (let i = 0; i < imgId.length; i++) {
    const ih = 200 + Math.floor(Math.random() * 10) * 15
    images.push('https://unsplash.it/250/' + ih + '?image=' + imgId[i])
  }

  const seo = {
    title: {
      en: 'Club',
      nl: 'Club',
      tr: 'Club',
    },
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      title: seo.title[locale],
      images,
    },
  }
}
