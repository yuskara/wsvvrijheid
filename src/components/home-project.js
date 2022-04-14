import { Button, Center, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React from 'react'

import { ChakraNextImage, Container, Navigate } from '~components'

export const HomeProject = ({ project, index }) => {
  const { locale } = useRouter()
  const { t } = useTranslation()
  return (
    <Center py={{ base: 16, lg: 32 }} minH={{ base: '100vh', lg: '50vh' }} bg={project.colors.bg}>
      <Container>
        <SimpleGrid columns={{ base: 1, lg: 2 }} justifyItems='center'>
          <ChakraNextImage order={{ base: 1, lg: index % 2 ? 2 : 1 }} image={project.image} boxSize={200} />
          <Stack spacing={4} order={{ base: 2, lg: index % 2 ? 1 : 2 }} textAlign={{ base: 'center', lg: 'left' }}>
            <Heading size='lg' fontWeight='black' color={project.colors.header}>
              {project.title[locale]}
            </Heading>
            <Text color={project.colors.text}>{project.description[locale]}</Text>
            <Navigate
              size='lg'
              alignSelf={{ base: 'center', lg: 'start' }}
              color={project.colors.header}
              variant='link'
              as={Button}
              href={project.link}
            >
              {t`read-more`}
            </Navigate>
          </Stack>
        </SimpleGrid>
      </Container>
    </Center>
  )
}
