import { Avatar, Button, HStack, Input } from '@chakra-ui/react'

import { useAuth } from '~hooks'
export const CreateComment = () => {
  const { user } = useAuth()
  console.log('user loged', user)
  return (
    <HStack>
      <Avatar
        size='md'
        src={`${process.env.NEXT_PUBLIC_API_URL}${user?.avatar?.formats.thumbnail.url || user?.avatar?.url}`}
        name={user?.username}
      />
      <Input placeholder='Add a comment'></Input>
      <Button colorScheme={'blue'}>Post</Button>
    </HStack>
  )
}
