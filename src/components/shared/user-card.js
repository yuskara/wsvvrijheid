import { Avatar, Box, Stack, Text } from '@chakra-ui/react'
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
      <Text textAlign='center' fontSize='lg' fontWeight='semibold' color='blue.500'>
        {user.fullname}
      </Text>

      <Box textAlign='center' fontSize='md'>
        {user.jobs.map(job => (
          <Text key={job.code}>{job[`name_${locale}`]}</Text>
        ))}
      </Box>
    </Stack>
  )
}
