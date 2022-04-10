import { Box, Button, Container, Divider, Heading, HStack, Link, Stack, Text } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import * as React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useAuth } from '~hooks'

import { FormItem } from './form-item'
import { OAuthButtonGroup } from './oauth-button-group'

const schema = t =>
  yup.object({
    username: yup.string().required(t`login.name.required`),
    password: yup
      .string()
      .min(8, t('login.password.warning'))
      .required(t('login.password.required'))
      .matches(RegExp('(.*[a-z].*)'), t('login.password.matches.lowercase'))
      .matches(RegExp('(.*[A-Z].*)'), t('login.password.matches.uppercase'))
      .matches(RegExp('(.*\\d.*)'), t('login.password.matches.number'))
      .matches(RegExp('[!@#$%^&*(),.?":{}|<>]'), t('login.password.matches.special')),
    email: yup
      .string()
      .email(t`contact.form.email-invalid`)
      .required(t`login.email.required`),
  })

export const SignupForm = () => {
  useAuth('/profile', true)

  const [errorMessage, setErrorMessage] = useState(null)

  const { t } = useTranslation()
  const router = useRouter()

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
    try {
      const resp = await axios.post('/api/auth/register', data)
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
        setErrorMessage(error?.response?.data?.error?.message)
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
            <Heading>{t('login.sign-up-header.title')}</Heading>
            <HStack spacing='1' justify='center'>
              <Text color='muted'>{t('login.sign-up-header.text')}</Text>
              <Button variant='link' as={Link} href='/user/login' colorScheme='blue'>
                {t('login.sign-up-header.button')}
              </Button>
            </HStack>
          </Stack>
        </Stack>
        <Box py={{ base: '0', sm: '8' }} px={{ base: '4', sm: '10' }} borderRadius={{ base: 'none', sm: 'xl' }}>
          <Stack spacing='6' as='form' onSubmit={handleSubmit(handleSubmitSignUp)}>
            <Stack spacing='5'>
              {errorMessage && <Text color='red.500'>{errorMessage}</Text>}
              <FormItem id='username' label={t('login.name.title')} register={register} errors={errors} />
              <FormItem id='email' type='email' label={t('login.email.title')} register={register} errors={errors} />
              <FormItem
                id='password'
                type='password'
                label={t('login.password.title')}
                autoComplete='current-password'
                register={register}
                errors={errors}
              />
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
