import { Box, HStack, Link, Stack, Text, VStack } from '@chakra-ui/react'

export const UserCard = ({ user }) => {
  return (
    <VStack p={6} spacing={8} borderColor='gray.400' borderRadius='10%' boxShadow='dark-lg' rounded='md' bg='white'>
      <Box flex={1} p={8}>
        {
          // <Avatar size="lg" src={volunter.avatar} />
        }
        <Text fontSize='24px' fontWeight='bold' color='blue.500'>
          {user.attributes.profile.name}
        </Text>
      </Box>
      <Text>{user.attributes.profile.bio}</Text>
    </VStack>
  )
}
