import { Button, FormLabel, Heading, Input, Stack } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'

import { Container, Layout } from '~components'

const LoginPage = () => {
  const router = useRouter()

  const onSubmit = async event => {
    event.preventDefault()

    const body = {
      identifier: event.currentTarget.identifier.value,
      password: event.currentTarget.password.value,
    }

    const user = await axios.post('/api/auth/login', body)

    console.log(user)
    router.push('/profile')
  }
  return (
    <Layout>
      <Container maxW='md'>
        <Stack>
          <Heading>Login to your account</Heading>
          <Stack as='form' method='post' action='/api/login' onSubmit={onSubmit}>
            <FormLabel htmlFor='identifier'>Identifier</FormLabel>
            <Input name='identifier' placeholder='test@test.fr' />
            <FormLabel htmlFor='password'>Password</FormLabel>
            <Input type='password' name='password' placeholder='********' />
            <Button type='submit'>Submit</Button>
          </Stack>
        </Stack>
      </Container>
    </Layout>
  )
}

export default LoginPage
