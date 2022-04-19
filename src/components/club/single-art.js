import { Avatar, Box, Button, Heading, HStack, Image, Stack, Text } from '@chakra-ui/react'
import { FaShare } from 'react-icons/fa'

export const SingleArt = props => {
  const { singleArt } = props
  // result.artist.user.data.attributes
  const imageUrlTwo = singleArt?.images?.map(images => images.formats.thumbnail.url)
  console.log('avatar url', singleArt?.artist?.user?.data?.attributes?.avatar?.data?.attributes?.formats.thumbnail.url)
  return (
    <Box>
      {
        //TODO this art should be single
        //single page
        //image should be responsive
      }
      <Image boxSize='550px' src={`${process.env.NEXT_PUBLIC_API_URL}${imageUrlTwo[0]}`} alt='single-page' />
      <Stack>
        <Heading as='h6' size='xs'>
          <HStack direction={['column', 'row']} justifyContent='space-between'>
            <Text>{singleArt?.title}</Text>{' '}
            <Button colorScheme='blue'>
              <FaShare />
            </Button>
          </HStack>
        </Heading>
        <Text>{singleArt?.content}</Text>
        <HStack>
          <Avatar
            size='md'
            src={`${process.env.NEXT_PUBLIC_API_URL}${
              singleArt?.artist?.user?.data?.attributes?.avatar?.data?.attributes?.formats.thumbnail.url ||
              singleArt?.artist?.user?.data?.attributes?.avatar?.data?.attributes?.url
            }`}
            name={singleArt?.artist?.user?.username}
          />
          <Text>{singleArt?.artist?.user.data.attributes.username}</Text>
        </HStack>
      </Stack>
    </Box>
  )
}
