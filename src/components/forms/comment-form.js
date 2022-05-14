import { Avatar, HStack, Input, Stack, Text } from '@chakra-ui/react'
import React from 'react'

export const CommentForm = ({ auth, artQuery }) => {
  console.log('auth', auth)

  return (
    <Stack spacing={-4}>
      <Stack>
        <Text ml='6' mt='4' textAlign='left' size='16px' color={'#2D3748'} fontWeight='semibold'>
          Write comment
        </Text>
      </Stack>
      <HStack p={6} rounded='lg'>
        <Avatar size='sm' src={`${artQuery.data?.artist?.user?.data?.attributes.avatar?.data?.attributes.url}`} />
        <Stack>
          <Input htmlSize={30} variant='outline' placeholder='Write Comment' />
        </Stack>
      </HStack>
    </Stack>
  )
}
