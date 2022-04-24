import { Alert, AlertDescription, AlertIcon, Button, Container, Heading, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useTranslation } from 'next-i18next'
import * as React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { FormItem } from './form-item'

const schema = t =>
  yup.object({
    email: yup
      .string()
      .email(t`contact.form.email-invalid`)
      .required(t`login.email.required`),
  })

export const ForgotPasswordForm = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema(t)),
    mode: 'all',
  })

  const handleSubmitSign = async data => {
    const body = {
      email: data.email,
    }
    setIsLoading(true)

    try {
      const resp = await axios.post('/api/auth/forgot-password', body)
      if (resp?.data?.error) {
        setErrorMessage(resp?.data?.error?.message)
        setTimeout(() => {
          setErrorMessage('')
          reset()
        }, 2000)
      } else {
        setSuccessMessage(`${t`login.forgot-pass-header.text`}`)
        reset()
      }
    } catch (error) {
      if (error?.response?.data?.error?.message) {
        setErrorMessage(error?.response?.data?.error?.message)
        setTimeout(() => {
          setErrorMessage('')
        }, 3000)
      } else {
        console.error('An unexpected error happened:', error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  // TODO: Add global toast message(useing useToast  from '@chakra-ui/react' or react-toastify)

  return (
    <Container maxW='lg' py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing='8' shadow='lg' bg='white' p={{ base: 8, lg: 12 }} rounded='lg'>
        <Stack spacing='6'>
          <Stack spacing={{ base: '', md: '3' }} textAlign='center'>
            <Heading>{t('login.forgot-pass-header.title')}</Heading>
          </Stack>
        </Stack>

        {successMessage && (
          <Alert
            status='success'
            variant='subtle'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
            height='200px'
          >
            <AlertIcon boxSize='40px' mr={0} mb={4} />
            <AlertDescription maxWidth='sm'>{successMessage}</AlertDescription>
          </Alert>
        )}
        {errorMessage && (
          <Alert
            status='error'
            variant='subtle'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
            padding='10px'
          >
            <AlertIcon boxSize='40px' mr={0} mb={4} />
            <AlertDescription maxWidth='sm'>{`${errorMessage}`}</AlertDescription>
          </Alert>
        )}
        <Stack spacing='6' as='form' onSubmit={handleSubmit(handleSubmitSign)}>
          <Stack spacing='5'>
            <FormItem id='email' label={t('login.email.title')} type='email' register={register} errors={errors} />
          </Stack>
          <Stack spacing='6'>
            <Button type='submit' colorScheme='blue' isLoading={isLoading}>
              {t('login.forgot-pass-header.button')}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  )
}
