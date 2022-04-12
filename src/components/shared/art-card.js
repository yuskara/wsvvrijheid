import { Button, Grid, HStack, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { FaRegHeart } from 'react-icons/fa'

export const ArtCard = ({ art }) => {
  return (
    <Grid gridTemplateRows='1fr auto' sx={{ breakInside: 'avoid' }}>
      <Image
        gridRow='1 / -1'
        gridColumn={1}
        rounded='lg'
        src={`${process.env.NEXT_PUBLIC_API_URL}${art.images[0]?.url}`}
        alt={art.title}
      />
      <HStack justify='space-between' fontSize='md' py={1}>
        <Text>{art.artist?.user?.data?.attributes.username || 'Anonim'}</Text>
        <Button size='sm' variant='ghost' leftIcon={<FaRegHeart />}>
          {art.likes}
        </Button>
      </HStack>
    </Grid>
  )
}
