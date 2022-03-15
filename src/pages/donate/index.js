import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { Container, FormItem, Layout, ProjectsList } from 'components'
import { request } from 'lib'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineEuroCircle } from 'react-icons/ai'
import { FaDonate } from 'react-icons/fa'
import * as yup from 'yup'

function generateSchema(t) {
  return yup.object().shape({
    name: yup.string().required(t`apply-form.name.required`),
    email: yup
      .string()
      .email(t`apply-form.email.invalid`)
      .required(t`apply-form.email.required`),
  })
}

const DonatePage = ({ projects, title }) => {
  const [amount, setAmount] = useState()
  const [method, setMethod] = useState()
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(generateSchema(t)),
    mode: 'onTouched',
  })

  const onSubmit = async data => {
    try {
      const { name, email } = data

      const result = await axios.post('/api/payment', { amount, method, name, email })

      window.location = result.data
    } catch (error) {
      console.error('request payment error', error)
    }
  }

  return (
    <Layout seo={{ title }}>
      <Container>
        <SimpleGrid columns={{ base: 1, lg: 2 }} my={16} gap={16}>
          <Stack
            px={16}
            py={12}
            spacing={8}
            bg='white'
            rounded='lg'
            shadow='lg'
            as='form'
            onSubmit={handleSubmit(onSubmit)}
          >
            <Heading as='h3' size='lg' textAlign='center' fontWeight='black'>
              {title}
            </Heading>

            <Stack>
              <HStack justify='center'>
                <Button
                  py={4}
                  colorScheme={method === 'ideal' ? 'blue' : 'gray'}
                  variant={method === 'ideal' ? 'solid' : 'outline'}
                  onClick={() => setMethod('ideal')}
                  h='auto'
                  leftIcon={<Image src='/images/ideal-logo.svg' h={50} alt='ideal' />}
                  size='lg'
                >
                  iDeal
                </Button>
                <Button
                  py={4}
                  colorScheme={method === 'creditcard' ? 'blue' : 'gray'}
                  variant={method === 'creditcard' ? 'solid' : 'outline'}
                  onClick={() => setMethod('creditcard')}
                  h='auto'
                  leftIcon={<Image src='/images/visa-master-logo.svg' h={50} alt='ideal' />}
                  size='lg'
                >
                  Credit Card
                </Button>
                <Button
                  py={4}
                  colorScheme={method === 'paypal' ? 'blue' : 'gray'}
                  variant={method === 'paypal' ? 'solid' : 'outline'}
                  onClick={() => setMethod('paypal')}
                  h='auto'
                  leftIcon={<Image src='/images/paypal-logo.svg' h={50} alt='ideal' />}
                  size='lg'
                >
                  PayPal
                </Button>
              </HStack>
              <Text textAlign='center' fontSize='md' color='gray.500'>
                Choose your payment method *
              </Text>
            </Stack>

            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <FormItem isRequired register={register} id='name' errors={errors} label={t`apply-form.name.input`} />
              <FormItem isRequired register={register} id='email' errors={errors} label={t`apply-form.email.input`} />
            </Stack>

            <ButtonGroup isAttached alignSelf='center' size='lg'>
              {[10, 20, 50, 100].map(val => (
                <Button
                  key={val}
                  variant={amount === val ? 'solid' : 'outline'}
                  colorScheme={amount === val ? 'green' : 'gray'}
                  onClick={() => setAmount(val)}
                >
                  €{val}
                </Button>
              ))}
            </ButtonGroup>
            <HStack pb={8} w='full'>
              <Slider
                id='slider'
                defaultValue={10}
                value={amount}
                min={0}
                max={100}
                colorScheme='green'
                onChange={v => setAmount(v)}
              >
                <SliderTrack height={3} rounded='lg'>
                  <SliderFilledTrack />
                </SliderTrack>
                <Tooltip
                  hasArrow
                  bg='green.500'
                  color='white'
                  placement='bottom'
                  isOpen={!!amount}
                  label={`€${amount}`}
                >
                  <SliderThumb boxSize={6} bg='green.500' color='white'>
                    <Box boxSize='full' as={AiOutlineEuroCircle} />
                  </SliderThumb>
                </Tooltip>
              </Slider>
            </HStack>
            <Button
              isDisabled={!amount || !method || !isValid}
              colorScheme='blue'
              type='submit'
              leftIcon={<FaDonate />}
            >
              {title}
              {amount && ` €${amount}`}
            </Button>
          </Stack>
          {projects && <ProjectsList projects={projects} />}
        </SimpleGrid>
      </Container>
    </Layout>
  )
}

export const getStaticProps = async context => {
  const projectsData = await request({ url: 'api/projects' })
  const projects =
    projectsData?.data.map(({ attributes }) => ({
      ...attributes,
      jobs: attributes.jobs.data.map(({ id, attributes }) => ({
        id,
        ...attributes,
      })),
    })) || null

  const seo = {
    title: {
      en: 'Donate',
      nl: 'Doneer',
      tr: 'Bağış Yap',
    },
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['common'])),
      title: seo.title[context.locale],
      projects,
    },
  }
}

export default DonatePage
