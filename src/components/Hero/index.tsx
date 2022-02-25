import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react'
//import { ChakraNextImage, Container, Navigate } from '@components'
import React from 'react'



export const Hero = ({
  title,
  description,
  video,
  image,
  buttonText,
  link,
  isFullHeight = true,
}): JSX.Element => {
  return (
    <Box
      pos="relative"
      height={isFullHeight ? '100vh' : '300px'}
      marginTop={{ base: '-64px', lg: '-100px' }}
    >
      Here is hero
    </Box>
  )
}
