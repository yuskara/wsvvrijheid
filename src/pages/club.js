import { Container } from '@chakra-ui/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

import { Layout, PageTitle } from '~components'

import { ArtCard } from '../components/shared/art-card'
import { MasonryGrid } from '../components/shared/masonry-grid'

export default function Club({ title, arts }) {
  return (
    <Layout scrollHeight={100} seo={{ title }}>
      <Container maxW='100%' centerContent>
        <PageTitle>{title}</PageTitle>
        <MasonryGrid>
          {arts.map(art => (
            <ArtCard art={art} key={art.key} />
          ))}
        </MasonryGrid>
      </Container>
    </Layout>
  )
}

export const getStaticProps = async context => {
  const { locale } = context
  let arts = []
  const imgId = [1011, 883, 1074, 823, 64, 65, 839, 314, 256, 316, 92, 643]
  for (let i = 0; i < imgId.length; i++) {
    const ih = 200 + Math.floor(Math.random() * 10) * 15
    arts.push({
      img: 'https://unsplash.it/250/' + ih + '?image=' + imgId[i],
      key: i,
    })
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
      arts,
    },
  }
}
