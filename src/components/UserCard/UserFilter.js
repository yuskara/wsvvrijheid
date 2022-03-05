import { Button, Stack, StackDivider, VStack } from '@chakra-ui/react'

export const UserFilter = ({ volunteers }) => {
  return (
    <VStack divider={<StackDivider borderColor='gray.200' />} spacing={4} align='stretch'>
      <Stack direction='row' spacing={4}>
        <Button colorScheme='teal' variant='solid'>
          {volunteers?.attributes.profile.bio}
        </Button>
      </Stack>
    </VStack>
  )
}
