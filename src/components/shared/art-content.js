import { Avatar, Heading, HStack, Stack, Text, Wrap } from '@chakra-ui/react'
import React from 'react'

export const ArtContent = ({ art }) => {
  return (
    <Stack borderRadius='sm' bg='white' boxShadow='base'>
      <Wrap justifyContent='space-between' pl='16px' pt='16px'>
        <Heading as='h2' flex={1} fontSize='30px'>
          {art.title}
        </Heading>
      </Wrap>
      <HStack pl='16px'>
        <Avatar
          size='sm'
          src={`${process.env.NEXT_PUBLIC_API_URL}${art.artist.user?.avatar?.url}`}
          name={art.artist.user?.username}
        />
        <Text fontWeight='semibold' lineHeight={6} fontSize='md' textColor='gray.700'>
          {art.artist.user?.username}
        </Text>
      </HStack>
      {/* TODO Does it supposed to be markdown?  */}
      <Text pl='16px' pb='16px' fontSize='md' textColor='gray.700' lineHeight={6}>
        {art.content}
      </Text>
    </Stack>
  )
}

export default ArtContent
