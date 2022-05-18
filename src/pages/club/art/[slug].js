import { HStack, Stack, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { dehydrate, QueryClient } from 'react-query'

import { ArtContentCard, ArtDetailCard, CommentForm, CommentList, Container, Layout } from '~components'
import { useAuth } from '~hooks'
import { getArt, getArtPaths, useGetArt } from '~services'

const ArtPage = ({ seo }) => {
  const { user } = useAuth()
  console.log('user', user)

  const {
    query: { slug },
    locale,
  } = useRouter()

  const artQuery = useGetArt(locale, slug)

  return (
    <Layout seo={seo}>
      <Container minH='inherit'>
        <HStack
          mt='4'
          flexWrap={'wrap'}
          spacing={{
            base: 0,
            md: 4,
          }}
          padding={4}
          alignItems='flex-start'
          justify='center'
        >
          {/* Single Art Images */}
          <ArtDetailCard arts={artQuery} slug={slug} locale={locale} />
          <VStack>
            <Stack
              justifyContent='flex-start'
              spacing={4}
              mt={{
                base: '4',
                md: '0',
              }}
            >
              {/* Single Art Content */}
              <ArtContentCard
                title={artQuery.data?.title}
                content={artQuery.data?.content}
                user={artQuery.data?.artist?.user}
              />
              {/* Single Art Comments */}
              <Stack spacing={4}>
                {/*  Comment form */}
                <CommentForm artQuery={artQuery} />

                {/*List comments of the current art */}
                <CommentList artQuery={artQuery} />
              </Stack>
              {/* TODO Translate */}
              <Text>More Like This</Text>

              {/* Other Arts List */}
              <Stack justify='space-between' w='full'>
                {/* TODO Create list of other arts which have the same categories as the current art 
                      We don't need to show the current art in the list, please filter it out.
                      Remember adding list of ArtCardSkeleton for loading state. */}
              </Stack>
            </Stack>
          </VStack>
        </HStack>
      </Container>
    </Layout>
  )
}

export default ArtPage

export const getStaticPaths = async context => {
  const paths = await getArtPaths(context.locales)
  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps = async context => {
  const { locale, params } = context
  const queryClient = new QueryClient()

  // See: `useGetArt` (services/art/find-one.js)
  // [arts, locale, slug]
  const queryKey = ['art', locale, params.slug]

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => getArt(locale, params.slug),
  })

  const art = queryClient.getQueryData(queryKey)

  if (!art)
    return {
      notFound: true,
    }

  const seo = {
    title: art.title,
    description: art.description,
    content: art.content,
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      seo,
      dehydratedState: dehydrate(queryClient),
    },
  }
}
