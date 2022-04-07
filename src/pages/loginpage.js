import { Button, FormLabel, Heading, Input, Stack, Text } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import { Container, Layout } from '~components'
import { useUser } from '~hooks'

export default function Login() {
    // here we just check if user is already logged in and redirect to profile
    useUser('/profile', true)

    const [errorMsg, setErrorMsg] = useState('')

    const router = useRouter()

    const handleSubmit = async event => {
        console.log(event)
        event.preventDefault()

        const body = {
            identifier: event.currentTarget.identifier.value,
            password: event.currentTarget.password.value,
        }

        try {
            await axios.post('/api/auth/login', body)
            router.push('/profile')
        } catch (error) {
            if (error?.response?.data?.error?.message) {
                setErrorMsg(error?.response?.data?.error?.message)
            } else {
                console.error('An unexpected error happened:', error)
            }
        }
    }

    return (
        <Layout>
            <Container maxW='md'>
                <Stack>
                    <Heading>Login to your account</Heading>
                    <Stack as='form' onSubmit={handleSubmit}>
                        <FormLabel htmlFor='identifier'>Identifier</FormLabel>
                        <Input name='identifier' placeholder='test@test.fr' />
                        <FormLabel htmlFor='password'>Password</FormLabel>
                        <Input type='password' name='password' placeholder='********' />
                        <Button type='submit'>Submit</Button>
                        {errorMsg && <Text color='red.400'>{errorMsg}</Text>}
                    </Stack>
                </Stack>
            </Container>
        </Layout>
    )
}