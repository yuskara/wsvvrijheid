import { Badge, Box, Code, Image, SimpleGrid, Stack, Text, Wrap } from '@chakra-ui/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

import { CategoryFilter, Container, Layout, Pagination } from '~components'
import { useChangeParams } from '~hooks'
import { request } from '~lib'

const Club = ({ arts, query, categories, title }) => {
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
      </Container>
    </Layout>
  )
}

export default Club

export const getServerSideProps = async context => {
  const { locale, query } = context
  const { category, page = 1 } = query

  const filters = category && { categories: { code: { $eq: category } } }

  const arts = await request({
    url: 'api/arts',
    filters,
    page,
    pageSize: 2,
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
      tr: 'Sanak Kulübü',
    },
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      title: seo.title[locale],
      query: context.query,
      categories: artCategories,
      arts,
    },
  }
}
