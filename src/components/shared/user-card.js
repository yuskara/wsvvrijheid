import { Avatar, Stack, Text, Wrap } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export const UserCard = ({ user }) => {
  const { locale } = useRouter()
  return (
    <Stack p={6} spacing={4} rounded='md' bg='white' w='full' shadow='md' align='center'>
      <Avatar
        name={user.fullname}
        size='lg'
        src={'https://api.samenvvv.nl' + user?.user?.avatar?.data?.attributes.url}
      />
      <Text fontSize='xl' fontWeight='semibold' color='blue.500'>
        {user.fullname}
      </Text>

      <Wrap>
        {user.jobs.map(j => (
          <Text key={j.id}>{j[`name_${locale}`]}</Text>
        ))}
      </Wrap>
    </Stack>
  )
}
