import { Badge, Box, Button, ButtonGroup, Code, Image, SimpleGrid, Stack, Text, Wrap } from '@chakra-ui/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

import { CategoryFilter, Container, Layout, Pagination } from '~components'
import { useChangeParams } from '~hooks'
import { request } from '~lib'

const Club = ({ arts, query, categories, title, images }) => {
  const changeParam = useChangeParams()

  return (
    <Layout seo={{ title }}>
      <Container>
        <Stack my={8}>
          <CategoryFilter categories={categories} currentCategory={query.category} />

          <Pagination
            pageCount={arts.pagination.pageCount}
            currentPage={+query.page}
            changeParam={() => changeParam({ page })}
          />

          <ButtonGroup colorScheme='green'>
            <Button onClick={() => changeParam({ sort: ['likes:desc'] })}>Sort Popular Desc</Button>
            <Button onClick={() => changeParam({ sort: ['likes:asc'] })}>Sort Popular Asc</Button>
            <Button onClick={() => changeParam({ sort: null })}>Remove Sort</Button>
          </ButtonGroup>

          <SimpleGrid columns={3} gap={4}>
            {arts.result.map(art => (
              <Box key={art.id} borderColor='gray.400' borderWidth={1}>
                <Image
                  h={300}
                  w='full'
                  objectFit='cover'
                  alt={art.title}
                  src={process.env.NEXT_PUBLIC_API_URL + art.images[0].url}
                />
                <Stack p={2}>
                  <Text>{art.title}</Text>
                  <Text>{art.likes} likes</Text>
                  <Wrap>
                    {art.categories.map(category => (
                      <Badge key={category.code}>{category.code}</Badge>
                    ))}
                  </Wrap>
                </Stack>
              </Box>
            ))}
          </SimpleGrid>
          <Code p={4} w='max-content'>
            <pre>{JSON.stringify(arts.pagination, null, 2)}</pre>
          </Code>
        </Stack>
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

export default Club

export const getServerSideProps = async context => {
  const { locale, query } = context
  const { category, page = 1, sort = [] } = query

  const filters = category && { categories: { code: { $eq: category } } }

  let images = []
  const imgId = [1011, 883, 1074, 823, 64, 65, 839, 314, 256, 316, 92, 643]
  for (let i = 0; i < imgId.length; i++) {
    const ih = 200 + Math.floor(Math.random() * 10) * 15
    images.push('https://unsplash.it/250/' + ih + '?image=' + imgId[i])
  }

  const arts = await request({
    url: 'api/arts',
    filters,
    page,
    pageSize: 2,
    sort,
    locale,
  })

  // FIXME We should filter categories which have arts
  // We may extend backend to return categories with arts
  const allCategories = await request({
    url: 'api/categories',
    pageSize: 100,
    locale,
  })

  const artCategories = allCategories.result.filter(category => category.arts?.length > 0)

  const seo = {
    title: {
      en: 'Art Club',
      nl: 'Kunst Club',
      tr: 'Sanat Kulübü',
    },
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      title: seo.title[locale],
      images,
      query: context.query,
      categories: artCategories,
      arts,
    },
  }
}
