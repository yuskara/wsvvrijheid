import { Box, Flex, AspectRatio, Image, Text, Link, Button, Stack } from '@chakra-ui/react'

function Card(props) {
  const { title, description, image, button, link } = props
  return (
    <Box
      maxWidth='32rem'
      borderWidth={1}
      margin={2}
      boxShadow='dark-lg'
      p='6'
      rounded='20px'
      overflow='hidden'
      bgColor={'lavender'}
      _hover={{
        shadow: '2xl',
      }}
      borderRadius='xl'
    >
      <AspectRatio ratio={5 / 4} _hover={{ shadow: '20xl0' }}>
        <Link href={link} isExternal>
          <Image
            maxWidth='450px'
            margin='auto'
            src={image}
            alt='project image'
            boxShadow='xs'
            p='6'
            rounded='40px'
            bg='silver'
            borderColor='blue'
            _hover={{ py: 2, px: 4, transform: 1.03, transition: '1s', borderRadius: 3 }}
          />
        </Link>
      </AspectRatio>

      <Stack
        align={{ base: 'center', md: 'center' }}
        textAlign={{ base: 'center', md: 'left', marginX: '100px' }}
        mt={{ base: 4, md: 10 }}
        ml={{ md: 4 }}
      >
        <Text fontWeight='bold' textTransform='uppercase' fontSize='lg' letterSpacing='wide' color='teal.600'>
          {title}
        </Text>
        <Link my={1} display='block' fontSize='md' lineHeight='normal' fontWeight='semibold' href={link} isExternal>
          {description}
        </Link>
        <Text my={2} color='gray.500'>
          {title}
        </Text>
        <Box textAlign='center'>
          <Link href={link} isExternal>
            <Button maxWidth='300px' my={2} bgColor={'silver'} _hover={{ bgColor: 'lightgreen' }}>
              {button}
            </Button>{' '}
          </Link>
        </Box>
      </Stack>
    </Box>
  )
}

export default Card
