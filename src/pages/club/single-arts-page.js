import { Box, HStack, Stack, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { dehydrate, QueryClient, useQuery } from 'react-query'

import { ArtCard, CategoryFilter, Container, Layout, MasonryGrid, Pagination } from '~components'
import { useAuth, useChangeParams } from '~hooks'
import { getArtCategories, getArts } from '~lib'

import { Comments, CreateComment, SingleArt } from '../../components/club'

const SingleArtsPage = ({ title }) => {
  const changeParam = useChangeParams()
  const { user } = useAuth()

  const {
    query: { page, category },
    locale,
  } = useRouter()

  const categoryQuery = useQuery({
    queryKey: ['art-categories', locale],
    queryFn: () => getArtCategories(locale),
  })

  const queryKey = ['arts', locale, category || null, page || '1']

  const artsQuery = useQuery({
    queryKey,
    queryFn: () =>
      getArts({
        url: 'api/arts',
        category,
        page,
        locale,
        pageSize: 2,
      }),
  })
  const singleArt = artsQuery?.data?.result?.find(result => result.id === 1)
  console.log('Whole Art', artsQuery)
  console.log('Single Art', singleArt)
  return (
    <Layout seo={{ title }} isLoading={artsQuery.isLoading || categoryQuery.isLoading}>
      <Container minH='inherit'>
        {artsQuery.data && (
          <HStack py={8} align='start' spacing={8} minH='inherit' alignItems='stretch'>
            <Box w={200}>
              <CategoryFilter categories={categoryQuery.data} currentCategory={category} />
            </Box>

            <VStack>
              <HStack justify='space-between' w='full'></HStack>
              <Stack>
                <Box boxSize='870px'>
                  {
                    //singleArt here
                    <SingleArt singleArt={singleArt} />
                  }

                  {
                    //comments area
                  }
                  <Comments />

                  {
                    //TODO comment create
                  }
                  <CreateComment />
                </Box>
              </Stack>
              <Text>More Like This</Text>
              {
                //these arts should be same category with single arts
              }
              <Stack justify='space-between' w='full'>
                {
                  //TODO these arts should be filters except for single id
                }
                <MasonryGrid gap={4}>
                  {artsQuery.data.result.map(art => (
                    <ArtCard key={art.id} art={art} user={user} isMasonry queryKey={queryKey} />
                  ))}
                </MasonryGrid>
                <Box alignSelf='center'>
                  <Pagination
                    pageCount={artsQuery.data.pagination.pageCount}
                    currentPage={+page}
                    changeParam={() => changeParam({ page })}
                  />
                </Box>
              </Stack>
            </VStack>
          </HStack>
        )}
      </Container>
    </Layout>
  )
}

export default SingleArtsPage

export const getStaticProps = async context => {
  const { locale } = context
  const queryClient = new QueryClient()

  queryClient.prefetchQuery({
    // [arts, category, page]
    queryKey: ['arts', locale, null, '1'],
    queryFn: () => getArts({ locale }),
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
      dehydratedState: dehydrate(queryClient),
    },
  }
}
