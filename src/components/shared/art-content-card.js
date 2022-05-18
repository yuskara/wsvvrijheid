import { Avatar, Heading, HStack, Stack, Text, Wrap } from '@chakra-ui/react'
import React from 'react'

export const ArtContentCard = ({ title, content, user }) => {
  return (
    <Stack borderRadius='sm' bg='white' boxShadow='md'>
      <Wrap justifyContent='space-between' pl='16px' pt='16px'>
        <Heading as='h2' flex={1} fontSize='30px'>
          {title}
        </Heading>
      </Wrap>
      <HStack pl='16px'>
        <Avatar size='sm' src={`${process.env.NEXT_PUBLIC_API_URL}${user?.avatar?.url}`} name={user?.username} />
        <Text fontWeight='semibold' lineHeight={6} fontSize='md' textColor='gray.700'>
          {user?.username}
        </Text>
      </HStack>
      {/* TODO Does it supposed to be markdown?  */}
      <Text pl='16px' pb='16px' fontSize='md' textColor='gray.700' lineHeight={6}>
        {content}
      </Text>
    </Stack>
  )
}

export default ArtContentCard
