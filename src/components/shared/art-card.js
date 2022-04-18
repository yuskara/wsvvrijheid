import { Box, Image } from '@chakra-ui/react'

export const ArtCard = ({ art }) => {
  return (
    <Box py={'1'}>
      <Image w='100%' borderRadius='md' src={art.img} alt='Alt' />
    </Box>
  )
}
