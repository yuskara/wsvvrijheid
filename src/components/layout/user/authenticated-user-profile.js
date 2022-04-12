import { Avatar, Button, ButtonGroup, HStack, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'

import { useAuth } from '~hooks'

export const AuthenticatedUserProfile = () => {
  const user = useAuth()

  console.log('User: ', user)
  return (
    <Stack spacing={4} align='stretch'>
      <VStack
        direction='center'
        align='center'
        height={'300px'}
        backgroundImage='https://images.unsplash.com/photo-1488415032361-b7e238421f1b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
        justifyContent='flex-end'
        alignItems={'center'}
        alignContent={'flex-end'}
      >
        <Avatar
          boxSize={{ base: 10, lg: 12 }}
          src={`${process.env.NEXT_PUBLIC_API_URL}${user?.user?.avatar?.formats.thumbnail.url || user.avatar?.url}`}
          name={user?.user?.username}
        />
        <HStack justifyContent='center' alignItems={'center'} alignContent={'flex-end'} bg='transparent'>
          <Text color={'white'}>{user?.user?.username}</Text>
        </HStack>
      </VStack>

      <Stack direction='flex' justify='space-between'>
        <ButtonGroup colorScheme='blue.400' variant='ghost'>
          <Button>My arts</Button>
          <Button>My Approved Arts</Button>
          <Button>My Returned Arts</Button>
          <Button>General Tools</Button>
        </ButtonGroup>
      </Stack>
    </Stack>
  )
}
