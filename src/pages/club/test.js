import { Box, Button, ButtonGroup, Code, Stack, Wrap } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useState } from 'react'
import { dehydrate, QueryClient, useQuery } from 'react-query'

import { ArtCard, CategoryFilter, Container, Layout, Pagination } from '~components'
import { useChangeParams } from '~hooks'
import { getArtCategories, getArts, request } from '~lib'

const Club = ({ title }) => {
  const changeParam = useChangeParams()
  const [pageSize, setPageSize] = useState(10)

  const {
    query: { page, sort, category },
    locale,
  } = useRouter()

  const categoryQuery = useQuery({
    queryKey: ['art-categories', locale],
    queryFn: () => getArtCategories(locale),
  })

  const artsQuery = useQuery({
    queryKey: ['arts', category || null, page || 1, sort || null, pageSize || 15],
    queryFn: () =>
      getArts({
        url: 'api/arts',
        category,
        page,
        sort,
        locale,
        pageSize,
      }),
  })

  return (
    <Layout seo={{ title }} isLoading={artsQuery.isLoading || categoryQuery.isLoading}>
      <Container>
        {artsQuery.data && (
          <Stack my={8}>
            <Wrap>
              <Stack>
                <ButtonGroup variant='outline' colorScheme='blue'>
                  <Button onClick={() => setPageSize(undefined)}>Clear</Button>
                  <Button onClick={() => setPageSize('2')}>2</Button>
                  <Button onClick={() => setPageSize('3')}>3</Button>
                  <Button onClick={() => setPageSize('4')}>4</Button>
                </ButtonGroup>
                <CategoryFilter categories={categoryQuery.data} currentCategory={category} />

                <Pagination
                  pageCount={artsQuery.data.pagination.pageCount}
                  currentPage={+page}
                  changeParam={() => changeParam({ page })}
                />

                <ButtonGroup colorScheme='green'>
                  <Button onClick={() => changeParam({ sort: ['likes:desc'] })}>Desc</Button>
                  <Button onClick={() => changeParam({ sort: ['likes:asc'] })}>Asc</Button>
                  <Button onClick={() => changeParam({ sort: null })}>Clear</Button>
                </ButtonGroup>
              </Stack>

              <Code p={4} w='max-content'>
                <pre>{JSON.stringify(artsQuery.data.pagination, null, 2)}</pre>
              </Code>
            </Wrap>

            <Box w='100%' mx='auto' sx={{ columnCount: { base: 1, sm: 2, md: 3, lg: 4, xl: 5 }, columnGap: 4 }}>
              {artsQuery.data.result.map(art => (
                <ArtCard key={art.id} art={art} />
              ))}
            </Box>
          </Stack>
        )}
      </Container>
    </Layout>
  )
}

export default Club

export const getStaticProps = async context => {
  const { locale } = context
  const queryClient = new QueryClient()

  queryClient.prefetchQuery({
    queryKey: ['arts', null, '1', null, '15'],
    queryFn: () => getArts({ locale }),
  })

  const arts = await request({
    url: 'api/arts',
    pageSize: 2,
    populate: ['artist.user', 'categories', 'images'],
  })

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
      initialArts: arts,
      dehydratedState: dehydrate(queryClient),
    },
  }
}
