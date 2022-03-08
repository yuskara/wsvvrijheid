import { Box, Button, Heading, Image, Link, Spacer, Stack, Text } from '@chakra-ui/react'
import { FaChevronRight } from 'react-icons/fa'

export const Card = props => {
  const { title, description, image, button, link } = props
  return (
    <Stack borderWidth={1} boxShadow='md' rounded='lg' overflow='hidden' role='group'>
      <Box h={240} overflow='hidden'>
        <Image
          objectFit='cover'
          boxSize='full'
          src={image}
          alt='project image'
          transition='transform 0.5s ease-in-out'
          _groupHover={{ transform: 'scale(1.1)' }}
        />
      </Box>

      <Stack spacing={4} flex={1} p={{ base: 4, lg: 8 }} align='center' textAlign='center'>
        <Heading
          as='h3'
          fontWeight='black'
          textTransform='uppercase'
          fontSize='xl'
          letterSpacing='wide'
          color='blue.500'
        >
          {title}
        </Heading>
        <Text fontSize='md' lineHeight='base'>
          {description}
        </Text>
        <Spacer />
        <Box textAlign='center'>
          <Link href={link} isExternal>
            <Button colorScheme='blue' size='lg' rightIcon={<FaChevronRight />}>
              {button}
            </Button>
          </Link>
        </Box>
      </Stack>
    </Stack>
  )
}
