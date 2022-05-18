import { Box, HStack, IconButton, Image, Text, VStack } from '@chakra-ui/react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { FaRegHeart } from 'react-icons/fa'

import { ShareButtons } from '~components'

export const ArtDetailCard = ({ arts = [], slug, locale }) => {
  return (
    <VStack bg='white' padding={4} boxShadow='md'>
      <Box maxW={500}>
        {arts.data?.images.length > 1 ? (
          <Splide>
            {arts.data?.images.map(image => (
              <SplideSlide key={image.id}>
                <Image
                  maxH={500}
                  rounded='md'
                  src={`${process.env.NEXT_PUBLIC_API_URL}${image.url}`}
                  alt='single-page'
                  objectFit='contain'
                  w='full'
                />
              </SplideSlide>
            ))}
          </Splide>
        ) : (
          <Image
            maxH={500}
            src={`${process.env.NEXT_PUBLIC_API_URL}${arts.data?.images[0].url}`}
            alt='single-page'
            objectFit='contain'
            rounded='md'
            w='full'
          />
        )}
      </Box>
      <Box>
        <HStack spacing={1} bg='white'>
          <Text>{arts.data?.likes}</Text>{' '}
          <IconButton
            as='span'
            isRound
            size='sm'
            aria-label='Like'
            icon={<FaRegHeart />}
            variant='ghost'
            colorScheme='red'
            onClick={() => console.log('like', arts.data?.id)}
            border='1px solid #eaeaea'
          />
          {/* TODO when I change size of the SharedButtons as shown in Figma, 
                    it will affect other SharedButtons component. Customize it to have different sizes
                    or create a new component for here */}
          <ShareButtons
            title={arts.data?.title}
            url={`${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/club/art/${slug}`}
          />
        </HStack>
      </Box>
    </VStack>
  )
}
