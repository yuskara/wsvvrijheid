import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import * as React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useUser } from '~hooks'

import { FormItem } from './form-item'
import { OAuthButtonGroup } from './oauth-button-group'
import { PasswordField } from './password-field'

const schema = t =>
  yup.object({
    name: yup.string().required(t`login.name.required`),
    password: yup
      .string()
      .required(t('login.password.required'))
      .min(8, t('login.password.warning'))
      .matches(RegExp('(.*[a-z].*)'), t('login.password.matches.lowercase'))
      .matches(RegExp('(.*[A-Z].*)'), t('login.password.matches.uppercase'))
      .matches(RegExp('(.*\\d.*)'), t('login.password.matches.number'))
      .matches(RegExp('[!@#$%^&*(),.?":{}|<>]'), t('login.password.matches.special')),
    email: yup
      .string()
      .email(t`contact.form.email-invalid`)
      .required(t`login.email.required`),
    message: yup.string().required(t`login.email.required`),
  })

export const SignupForm = () => {
  const { t } = useTranslation()
  const [error, setErrorMessage] = useState(null)
  const router = useRouter()
  useUser('/profile', true)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema(t)),
    mode: 'all',
  })

  const handleSubmitSignUp = async data => {
    console.log('Data', data)
    const body = {
      username: data.name,
      email: data.email,
      password: data.password,
    }
    try {
      const resp = await axios.post('/api/auth/register', body)
      if (resp?.data?.error) {
        setErrorMessage(resp?.data?.error?.message)
        setTimeout(() => {
          setErrorMessage('')
          reset()
        }, 2000)
      } else {
        reset()
        router.push('/')
      }
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
            <Heading size={{ base: 'xs', md: 'sm' }}>{t('login.sign-up-header.title')}</Heading>
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
          boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Stack spacing='6' as='form' onSubmit={handleSubmit(handleSubmitSignUp)}>
            <Stack spacing='5'>
              {error ? <Text color='red.500'>{error}</Text> : ''}
              <FormControl>
                <FormLabel htmlFor='name'>{t('login.name.title')}</FormLabel>
                <FormItem name='name' id='name' type='text' register={register} errors={errors} />
                <FormLabel htmlFor='email'>{t('login.email.title')}</FormLabel>
                <FormItem name='email' id='email' type='email' register={register} errors={errors} />
                <PasswordField register={register} errors={errors} />
              </FormControl>
              <Text fontSize='sm' whiteSpace='nowrap' color='muted'>
                {t('login.password.warning')}
              </Text>
            </Stack>
            <Stack spacing='6'>
              <Button type='submit' colorScheme='blue'>
                {t('login.create-account')}
              </Button>
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
