import { Avatar, Stack, Text } from '@chakra-ui/react'
import { JOBS } from 'data'
import { useRouter } from 'next/router'

export const UserCard = ({ user }) => {
  const { locale } = useRouter()
  return (
    <Stack p={6} spacing={4} rounded='md' bg='white' w='full' shadow='md' align='center'>
      <Avatar
        name={user.attributes.profile.name}
        size='lg'
        src={'https://api.samenvvv.nl' + user.attributes?.user?.data?.attributes?.avatar?.data.attributes.url}
      />
      <Text fontSize='xl' fontWeight='semibold' color='blue.500'>
        {user.attributes.profile.name}
      </Text>

      <Text fontSize='md'>{JOBS[user.attributes.job][locale]}</Text>
    </Stack>
  )
}
