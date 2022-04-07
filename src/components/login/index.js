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
    FormErrorMessage
} from '@chakra-ui/react'
import * as React from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import axios from 'axios'
import { Logo } from './Logo'
import { OAuthButtonGroup } from './OAuthButtonGroup'
import { PasswordField } from './PasswordField'
import { login } from '../../utils'
import { useForm } from 'react-hook-form'
import { setToken } from 'utils/services'
import { useUser } from '~hooks'

export const Login = () => {
    const { register, handleSubmit, reset, formState: { errors }, } = useForm()
    const [errorMessage, setErrorMessage] = useState(null)
    useUser('/profile', true)

    const [errorMsg, setErrorMsg] = useState('')
    const router = useRouter();
    /*
        const handleSignIn = (data) => {
            console.log("Data", data)
            axios
                .post('https://api.samenvvv.nl/api/auth/local', {
                    identifier: data.email,
                    password: data.password,
                })
                .then((response) => {
                    // Handle success.
                    console.log("response", response)
                    setToken(response.data.jwt)
                    localStorage.setItem("loggedUser", JSON.stringify(response.data.user))
                    reset()
                    router.push("/");
                })
                .catch((error) => {
                    // Handle error.
                    console.log('An error occurred:', error);
                    setErrorMessage(error.response.data.error.message)
                    setTimeout(() => {
                        setErrorMessage("")
                        reset()
                    }, 2000)
                });
        }
    */
    //
    const handleSubmitSign = async event => {
        console.log("event : ", event)
        //   event.preventDefault()

        const body = {
            identifier: event.email,
            password: event.password,
        }
        console.log("body", body)
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
                    <Stack spacing='6' as="form" onSubmit={handleSubmit(handleSubmitSign)}>
                        <Stack spacing='5' >
                            {errorMessage ? <Text color='red.500' >{errorMessage}</Text> : ""}
                            <FormControl>
                                <FormLabel htmlFor='email'>Email</FormLabel>
                                <Input name='email' id='email' type='email' {...register("email", { required: "email is required" })} />
                                <Text color="red.400">{errors?.email?.message}</Text>
                            </FormControl >
                            <PasswordField register={register} errors={errors} />
                        </Stack>
                        <HStack justify='space-between'>
                            <Checkbox defaultIsChecked>Remember me</Checkbox>
                            <Button variant='link' colorScheme='blue' size='sm'>
                                Forgot password?
                            </Button>
                        </HStack>
                        <Stack spacing='6'>
                            <Input color='blue.600' as={Button} type='submit' variant='primary'>{
                            }
                                Sign in
                            </Input>
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
