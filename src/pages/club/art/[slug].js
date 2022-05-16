import { Avatar, Flex, Heading, HStack, Image, Stack, Text, VStack, Wrap } from '@chakra-ui/react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { dehydrate, QueryClient } from 'react-query'

import { CommentForm, Comments, Container, Layout, ShareButtons } from '~components'
import { useAuth } from '~hooks'
import { getArt, useGetArt } from '~services'

const ArtPage = ({ title }) => {
  const { user } = useAuth()
  console.log('user', user)

  const {
    query: { slug },
    locale,
  } = useRouter()

  const artQuery = useGetArt(locale, slug)

  return (
    <Layout seo={{ title }}>
      <Container minH='inherit'>
        <VStack>
          <Stack>
            {/* Single Art Content */}
            <Stack>
              {/* Single Art Images */}
              <Splide>
                {artQuery.data?.images.map(image => (
                  <Flex justify='center' as={SplideSlide} key={image.id} w='max-content'>
                    <Image
                      maxH={500}
                      src={`${process.env.NEXT_PUBLIC_API_URL}${image.url}`}
                      alt='single-page'
                      objectFit='cover'
                    />
                  </Flex>
                ))}
              </Splide>
              <Stack>
                <Wrap spacing={4} justifyContent='space-between'>
                  <Heading as='h2' flex={1}>
                    {artQuery.data?.title}
                  </Heading>
                  <ShareButtons
                    title={artQuery.data?.title}
                    url={`${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/club/art/${slug}`}
                  />
                </Wrap>

                {/* TODO Is it supposed to be markdown? */}
                <Text>{artQuery.data?.content}</Text>
                <HStack>
                  <Avatar
                    size='md'
                    src={`${process.env.NEXT_PUBLIC_API_URL}${artQuery.data?.artist?.user?.data?.attributes.avatar?.data?.attributes.url}`}
                    name={artQuery.data?.artist?.user?.username}
                  />
                  <Text>{artQuery.data?.artist?.user?.data?.attributes.username}</Text>
                </HStack>
              </Stack>
            </Stack>

            {/* TODO Create comment form */}
            <CommentForm />

            {/* TODO List comments of the current art */}
            <Comments />
          </Stack>
          {/* TODO Translate */}
          <Text>More Like This</Text>

          {/* Other Arts List */}
          <Stack justify='space-between' w='full'>
            {/* TODO Create list of other arts which have the same categories as the current art 
                We don't need to show the current art in the list, please filter it out
              
              TODO Create ArtListSkeleton component for ArtList 
          */}
          </Stack>
        </VStack>
      </Container>
    </Layout>
  )
}

export default ArtPage

export const getStaticPaths = async () => {
  // TODO get paths from `lib/art/paths.js`
  // const paths = await getArtPaths()
  // return { paths, fallback: true } // See: `pages/blog/[slug].js`
  return {
    paths: [
      {
        params: { slug: 'fire' },
        locale: 'en',
      },
    ],
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

  // TODO Provide available seo props (description, image, etc.)
  const seo = {
    title: art.title,
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      title: seo.title,
      dehydratedState: dehydrate(queryClient),
    },
  }
}
