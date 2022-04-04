import {
    Box,
    Button,
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

import { Logo } from '../login/Logo'
import { OAuthButtonGroup } from '../login/OAuthButtonGroup'
import { PasswordField } from '../login/PasswordField'

export const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPasswod] = useState('')
    const handleChange = e => {
        e.preventDefault()
        if (e.target.id === 'name') {
            setName(e.target.value)
        } else if (e.target.id === 'email') {
            setEmail(e.target.value)
        } else if (e.target.id === 'password') {
            setPasswod(e.target.value)
        }
    }
    const handleSignUp = e => {
        e.preventDefault()
        console.log('State: ', 'name: ', name, 'Email: ', email, 'Passwod: ', password)
    }

    return (
        <Container maxW='lg' py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
            <Stack spacing='8'>
                <Stack spacing='6'>
                    <Logo />
                    <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
                        <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>Create an account</Heading>
                        <HStack spacing='1' justify='center'>
                            <Text color='muted'>Already have an account?</Text>
                            <Button variant='link' as={Link} href='/login' colorScheme='blue'>
                                Log in
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
                            <FormControl isRequired>
                                <FormLabel htmlFor='name'>Name</FormLabel>
                                <Input onChange={handleChange} id='name' type='text' />
                                <FormLabel htmlFor='email'>Email</FormLabel>
                                <Input onChange={handleChange} id='email' type='email' />
                                <PasswordField onChange={handleChange} />
                            </FormControl>
                            <Text fontSize='sm' whiteSpace='nowrap' color='muted'>
                                At least 8 characters long
                            </Text>
                        </Stack>
                        <Stack spacing='6'>
                            <Button
                                variant='solid'
                                cursor='pointer'
                                borderStyle='solid'
                                colorScheme='blue'
                                borderColor='blue.500'
                                onClick={handleSignUp}
                            >
                                Create Account
                            </Button>
                            <HStack>
                                <Divider />
                                <Text fontSize='sm' whiteSpace='nowrap' color='muted'>
                                    or sign up with
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
