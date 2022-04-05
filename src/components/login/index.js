import {
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Link,
    Stack,
    Text,
    useBreakpointValue,
    useColorModeValue,
} from '@chakra-ui/react'
import * as React from 'react'
import { useState } from 'react'

import { Logo } from './Logo'
import { OAuthButtonGroup } from './OAuthButtonGroup'
import { PasswordField } from './PasswordField'
import { login } from '../../utils'

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPasswod] = useState('')

    const handleChange = e => {
        console.log("fine", email)
        e.preventDefault()

        if (e.target.id === 'email') {
            setEmail(e.target.value)
        } else if (e.target.id === 'password') {
            setPasswod(e.target.value)
        }
    }

    const handleSignIn = e => {
        e.preventDefault()
        login({ email, password })
        setEmail('')
        setPasswod('')
        if (e.target.id === 'email') {
            e.target.value = ""
        } else if (e.target.id === 'password') {
            e.target.value = ""
        }

    }

    return (
        <Container maxW='lg' py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
            <Stack spacing='8'>
                <Stack spacing='6'>
                    <Logo />
                    <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
                        <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>Log in to your account</Heading>
                        <HStack spacing='1' justify='center'>
                            <Text color='muted'>Don't have an account?</Text>
                            <Button variant='link' as={Link} href='/sign-up' colorScheme='blue'>
                                Sign up
                            </Button>
                        </HStack>
                    </Stack>
                </Stack>
                <Box
                    py={{ base: '0', sm: '8' }}
                    px={{ base: '4', sm: '10' }}
                    bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
                    boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
                    borderRadius={{ base: 'none', sm: 'xl' }}
                >
                    <Stack spacing='6'>
                        <Stack spacing='5'>
                            <FormControl>
                                <FormLabel htmlFor='email'>Email</FormLabel>
                                <Input onChange={e => setEmail(e.target.value)} id='email' type='email' />
                            </FormControl>
                            <PasswordField onChange={e => setPasswod(e.target.value)} />
                        </Stack>
                        <HStack justify='space-between'>
                            <Checkbox defaultIsChecked>Remember me</Checkbox>
                            <Button variant='link' colorScheme='blue' size='sm'>
                                Forgot password?
                            </Button>
                        </HStack>
                        <Stack spacing='6'>
                            <Button onClick={handleSignIn} variant='primary'>
                                Sign in
                            </Button>
                            <HStack>
                                <Divider />
                                <Text fontSize='sm' whiteSpace='nowrap' color='muted'>
                                    or continue with
                                </Text>
                                <Divider />
                            </HStack>
                            <OAuthButtonGroup />
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Container>
    )
}
