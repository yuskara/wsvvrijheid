import { Avatar, Box, Flex, Heading, HStack, IconButton, Image, Stack, Text, VStack, Wrap } from '@chakra-ui/react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { FaRegHeart } from 'react-icons/fa'
import { dehydrate, QueryClient } from 'react-query'

import { CommentForm, Comments, Container, Layout, ShareButtons } from '~components'
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
    <Layout seo={{ seo }}>
      <Container minH='inherit'>
        <HStack flexWrap={'wrap'} spacing='20px'>
          <VStack bgColor={'gray.100'}>
            <Box>
              <Splide>
                {artQuery.data?.images.map(image => (
                  <Flex justify='center' as={SplideSlide} key={image.id} w='max-content' bg='white'>
                    <Image
                      maxH={500}
                      borderRadius='lg'
                      src={`${process.env.NEXT_PUBLIC_API_URL}${image.url}`}
                      alt='single-page'
                      objectFit='cover'
                    />
                  </Flex>
                ))}
              </Splide>
            </Box>
            <Box>
              <HStack spacing={1} bg='white'>
                <Text>{artQuery.data?.likes}</Text>{' '}
                <IconButton
                  size='sm'
                  isRound
                  aria-label='Like'
                  icon={<FaRegHeart />}
                  variant='ghost'
                  colorScheme='red'
                  onClick={() => likeArt({ art })}
                />
                {/* TODO when I change size of the SharedButtons as shown in Figma, 
                    it will affect other SharedButtons component. Customize it to have different sizes
                    or create a new component for here */}
                <ShareButtons
                  title={artQuery.data?.title}
                  url={`${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/club/art/${slug}`}
                />
              </HStack>
            </Box>
          </VStack>
          <VStack>
            <Stack justifyContent='flex-start' spacing={4}>
              {/* Single Art Content */}
              <Stack>
                {/* Single Art Images */}

                <Stack bg='white'>
                  <Wrap justifyContent='space-between' pl='16px' pt='16px'>
                    <Heading as='h2' flex={1} fontSize='30px'>
                      {artQuery.data?.title}
                    </Heading>
                  </Wrap>
                  <HStack pl='16px'>
                    <Avatar
                      size='sm'
                      src={`${process.env.NEXT_PUBLIC_API_URL}${artQuery.data?.artist?.user?.avatar?.url}`}
                      name={artQuery.data?.artist?.user?.username}
                    />
                    <Text fontSize='16px'>{artQuery.data?.artist?.user?.username}</Text>
                  </HStack>
                  {/* TODO Does it supposed to be markdown? */}
                  <Text pl='16px' pb='16px' fontSize='16px' maxW={350}>
                    {artQuery.data?.content}
                  </Text>
                </Stack>
              </Stack>
              <Stack bg='white'>
                <Stack>
                  {/* TODO Create comment form */}
                  <CommentForm artQuery={artQuery} />

                  {/* TODO List comments of the current art */}
                  <Comments artQuery={artQuery} />
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
