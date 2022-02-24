import { Container as ChakraContainer } from '@chakra-ui/react'

export const Container = props => {
  return <ChakraContainer maxW='container.xl' {...props} />
}
