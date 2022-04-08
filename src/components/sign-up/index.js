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
import axios from 'axios'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import * as React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { OAuthButtonGroup } from '../login/oauth-button-group'
import { PasswordField } from '../login/password-field'

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const [error, setErrorMessage] = useState(null)
  const router = useRouter()
  const { t } = useTranslation()
  const handleSubmitSignUp = async data => {
    const body = {
      username: data.name,
      email: data.email,
      password: data.password,
    }
    try {
      await axios.post('/api/auth/register', body)
      reset()
      router.push('/')
    } catch (error) {
      if (error?.response?.data?.error?.message) {
        setErrorMessage(eerror?.response?.data?.error?.message)
        setTimeout(() => {
          setErrorMessage('')
        }, 2000)
      } else {
        console.error('An unexpected error happened:', error)
      }
    }
  }
  return (
    <Container maxW='lg' py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing='8'>
        <Stack spacing='6'>
          <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
            <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>{t('login.sign-up-header.title')}</Heading>
            <HStack spacing='1' justify='center'>
              <Text color='muted'>{t('login.sign-up-header.text')}</Text>
              <Button variant='link' as={Link} href='/user/login' colorScheme='blue'>
                {t('login.sign-up-header.button')}
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
          <Stack spacing='6' as='form' onSubmit={handleSubmit(handleSubmitSignUp)}>
            <Stack spacing='5'>
              {error ? <Text color='red.500'>{error}</Text> : ''}
              <FormControl>
                <FormLabel htmlFor='name'>{t('login.name.title')}</FormLabel>
                <Input
                  name='name'
                  id='name'
                  type='text'
                  {...register('name', { required: t('login.name.required') })}
                />
                <Text color='red.400'>{errors?.name?.message}</Text>
                <FormLabel htmlFor='email'>{t('login.email.title')}</FormLabel>
                <Input
                  name='email'
                  id='email'
                  type='email'
                  {...register('email', { required: t('login.email.required') })}
                />
                <Text color='red.400'>{errors?.email?.message}</Text>
                <PasswordField register={register} errors={errors} />
              </FormControl>
              <Text fontSize='sm' whiteSpace='nowrap' color='muted'>
                {t('login.password.warning')}
              </Text>
            </Stack>
            <Stack spacing='6'>
              <Input
                as={Button}
                variant='solid'
                cursor='pointer'
                borderStyle='solid'
                colorScheme='blue'
                color='white'
                borderColor='white.700'
                bg='blue.600'
                type='submit'
              >
                {t('login.create-account')}
              </Input>
              <HStack>
                <Divider />
                <Text fontSize='sm' whiteSpace='nowrap' color='muted'>
                  {t('login.sign-up-with')}
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
