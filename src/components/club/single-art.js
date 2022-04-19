const { Stack, Box, HStack, Heading, Text, Avatar, Image } = require('@chakra-ui/react')

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
          {singleArt?.title}
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
