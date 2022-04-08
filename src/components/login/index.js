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
import axios from 'axios'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import * as React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useUser } from '~hooks'

import { OAuthButtonGroup } from './oauth-button-group'
import { PasswordField } from './password-field'

export const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const [errorMessage, setErrorMessage] = useState('')
  const { t } = useTranslation()
  useUser('/', true)

  const router = useRouter()

  const handleSubmitSign = async data => {
    const body = {
      identifier: data.email,
      password: data.password,
    }

    try {
      await axios.post('/api/auth/login', body)
      reset()
      router.push('/')
    } catch (error) {
      if (error?.response?.data?.error?.message) {
        setErrorMessage(error?.response?.data?.error?.message)
        setTimeout(() => {
          setErrorMessage('')
          reset()
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
            <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>{t('login.sign-in-header.title')}</Heading>
            <HStack spacing='1' justify='center'>
              <Text color='muted'>{t('login.sign-in-header.text')}</Text>
              <Button variant='link' as={Link} href='/user/register' colorScheme='blue'>
                {t('login.sign-in-header.button')}
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
          <Stack spacing='6' as='form' onSubmit={handleSubmit(handleSubmitSign)}>
            <Stack spacing='5'>
              {errorMessage ? <Text color='red.500'>{errorMessage}</Text> : ''}
              <FormControl>
                <FormLabel htmlFor='email'>{t('login.email.title')}</FormLabel>
                <Input
                  name='email'
                  id='email'
                  type='email'
                  {...register('email', { required: t('login.email.required') })}
                />
                <Text color='red.400'>{errors?.email?.message}</Text>
              </FormControl>
              <PasswordField register={register} errors={errors} />
            </Stack>
            <HStack justify='space-between'>
              <Checkbox defaultIsChecked>{t('login.remember-me')}</Checkbox>
              <Button variant='link' colorScheme='blue' size='sm'>
                {t('login.password.forgot-password')}
              </Button>
            </HStack>
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
                {t('login.sign-in')}
              </Input>
              <HStack>
                <Divider />
                <Text fontSize='sm' whiteSpace='nowrap' color='muted'>
                  {t('login.sign-in-with')}
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
