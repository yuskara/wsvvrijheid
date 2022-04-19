import { Heading, HStack, Stack, Switch, Text, VStack } from '@chakra-ui/react'

export const Comments = () => {
  return (
    <Stack margin='10px'>
      <HStack>
        <Heading>Comments</Heading>
        <Switch id='isChecked' colorScheme='blue' size='lg' />
        {
          //TODO show comments or not according to this checked
        }
        Show or not
      </HStack>
      <VStack
        sx={{
          '&::-webkit-scrollbar': {
            width: '12px',
            borderRadius: '8px',
            backgroundColor: `rgba(0, 0, 0, 0.05)`,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: `blue.400`,
          },
        }}
        overflowX='auto'
        maxHeight='60px'
        borderRadius='20px'
        border='1px'
        justifyContent='flex-start'
        borderColor='gray.200'
      >
        <Text>Here is some comment</Text>
        <Text>Here is some comment</Text>
        <Text>Here is some comment</Text>
        <Text>Here is some comment</Text>
        <Text>Here is some comment</Text>
        <Text>Here is some comment</Text>
      </VStack>
    </Stack>
  )
}
