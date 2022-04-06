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
import axios from 'axios';
import { Logo } from '../login/Logo'
import { useRouter } from 'next/router'
import { OAuthButtonGroup } from '../login/OAuthButtonGroup'
import { PasswordField } from '../login/PasswordField'
import { setToken } from '../../utils/services'
import { useForm } from 'react-hook-form'

export const SignUp = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [error, setErrorMessage] = useState(null)
    const router = useRouter();
    const handleSignUp = (data) => {
        axios
            .post('https://api.samenvvv.nl/api/auth/local/register', {
                username: data.name,
                email: data.email,
                password: data.password,
            })
            .then((response) => {
                // Handle success.
                console.log('Well done!');
                console.log('User profile', response.data.user);
                console.log('User token', response.data.jwt);
                setToken(response.data.jwt)
                localStorage.setItem("loggedUser", JSON.stringify(response.data.user))
                reset()
                router.push("/");
            })
            .catch((error) => {
                // Handle error.
                console.log('An error occurred:', error.response);
                setErrorMessage(error.response.data.error.message)
                setTimeout(() => {
                    setErrorMessage("")
                }, 2000)

            });


    }

    return (
        <Container maxW='lg' py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
            <Stack spacing='8'>
                <Stack spacing='6'>
                    <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
                        <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>Create an account</Heading>
                        <HStack spacing='1' justify='center'>
                            <Text color='muted'>Already have an account?</Text>
                            <Button variant='link' as={Link} href='/login' colorScheme='blue'>
                                Sign in
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
                    <Stack spacing='6' as="form" onSubmit={handleSubmit(handleSignUp)} >
                        <Stack spacing='5'>
                            {error ? <Text color='red.500' >{error}</Text> : ""}
                            <FormControl >
                                <FormLabel htmlFor='name'>Name</FormLabel>
                                <Input name="name" id='name' type='text' {...register("name", { required: "Name is required" })} />
                                <Text color="red.400">{errors?.name?.message}</Text>
                                <FormLabel htmlFor='email'>Email</FormLabel>
                                <Input name='email' id='email' type='email' {...register("email", { required: "email is required" })} />
                                <Text color="red.400">{errors?.email?.message}</Text>
                                <PasswordField register={register} errors={errors} />
                            </FormControl>
                            <Text fontSize='sm' whiteSpace='nowrap' color='muted'>
                                At least 8 characters long
                            </Text>
                        </Stack>
                        <Stack spacing='6'>
                            <Input
                                as={Button}
                                variant='solid'
                                cursor='pointer'
                                borderStyle='solid'
                                colorScheme='blue'
                                color='blue.400'
                                borderColor='white.700'
                                bg='blue.600'
                                type='submit'

                            >
                                Create Account
                            </Input>
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
