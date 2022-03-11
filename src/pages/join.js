import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormLabel,
  Heading,
  HStack,
  Link,
  SimpleGrid,
  Spacer,
  Spinner,
  Stack,
  Switch,
  Text,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Container, FormItem, Layout, PageTitle } from 'components'
import { request } from 'lib'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { forwardRef, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import * as yup from 'yup'

const heardFrom = [
  {
    label: {
      en: 'Whatsapp',
      nl: 'Whatsapp',
      tr: 'Whatsapp',
    },
    value: 'whatsapp',
    selected: false,
  },
  {
    label: {
      en: 'Email',
      nl: 'Email',
      tr: 'Email',
    },
    value: 'mail',
    selected: false,
  },
  {
    label: {
      en: 'Friend',
      nl: 'Vrienden',
      tr: 'Arkadaş',
    },
    value: 'friends',
    selected: false,
  },
  {
    label: {
      en: 'Web',
      nl: 'Web',
      tr: 'Internet',
    },
    value: 'web',
    selected: false,
  },
  {
    label: {
      en: 'Other',
      nl: 'Anders',
      tr: 'Diğer',
    },
    value: 'other',
    selected: false,
  },
]

function generateSchema(t, jobs) {
  return yup.object().shape({
    name: yup.string().required(t`apply-form.name.required`),
    email: yup
      .string()
      .email(t`apply-form.email.invalid`)
      .required(t`apply-form.email.required`),
    phone: yup.string(),
    inMailingList: yup.boolean(),
    isPublic: yup.boolean(),
    availableHours: yup
      .number()
      .nullable(true)
      .transform((_, val) => (val === Number(val) ? val : null)),
    heardFrom: yup.object().shape(
      heardFrom.reduce((acc, h) => {
        acc[h] = yup.bool()
        return acc
      }, {}),
    ),
    subjects: yup.object().shape(
      jobs.reduce((acc, h) => {
        acc[h] = yup.bool()
        return acc
      }, {}),
    ),
  })
}

const SwitchForm = forwardRef(function SwitchForm(props, ref) {
  return <Switch ref={ref} {...props} />
})

const CheckboxForm = forwardRef(function CheckboxForm(props, ref) {
  return <Checkbox ref={ref} {...props} />
})

const VolunteersJoin = ({ title }) => {
  // TODO Add all translations
  const { t } = useTranslation()
  const { locale } = useRouter()

  const projectsQuery = useQuery(['projects', locale], () => request({ locale, url: 'api/projects' }), {
    select: useCallback(projects => {
      return projects.data.map(({ attributes }) => ({
        ...attributes,
        jobs: attributes.jobs.data.map(({ id, attributes }) => ({
          id,
          ...attributes,
        })),
      }))
    }, []),
  })

  const jobs = projectsQuery.data?.flatMap(p => p.jobs) || []

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(generateSchema(t, jobs)),
    mode: 'all',
  })

  if (projectsQuery.isLoading) return <Spinner />

  const onSubmit = data => {
    // TODO Remove logs
    console.log(data)

    const mapDataToString = data =>
      Object.entries(data)
        .filter(([, v]) => v)
        .map(([k]) => k.split('_')[0])
        .join(', ')

    const heardFromData = mapDataToString(data.heardFrom)
    const subjectsData = mapDataToString(data.subjects)
    console.log('heardFromData', heardFromData)
    console.log('subjectsData', subjectsData)

    // TODO Create volunteer with data
  }

  return (
    <Layout>
      <Container>
        <PageTitle>{title}</PageTitle>
        <SimpleGrid mb={8} gap={8} columns={{ base: 1, lg: 2 }} alignItems='start'>
          {/* FORM */}
          <Stack p={8} bg='white' rounded='lg' shadow='md' as='form' spacing={4} onSubmit={handleSubmit(onSubmit)}>
            <Heading as='h3' size='lg' textAlign='center' fontWeight='black'>
              {t`apply-form.title`}
            </Heading>
            <Stack direction={{ base: 'column', md: 'row' }}>
              <FormItem register={register} id='name' errors={errors} label={t`apply-form.name`} />

              <FormItem register={register} id='email' errors={errors} label={t`apply-form.email`} />
            </Stack>
            <Stack direction={{ base: 'column', md: 'row' }}>
              <FormItem register={register} id='phone' errors={errors} label={t`apply-form.phone`} />
              <FormItem
                type='number'
                register={register}
                id='availableHours'
                errors={errors}
                label={t`apply-form.available-hours`}
              />
            </Stack>

            <Stack justify='space-between' direction={{ base: 'column', md: 'row' }}>
              <HStack>
                <SwitchForm id='in-mailing-list' {...register('inMailingList')} />
                <FormLabel htmlFor='in-mailing-list'>{t`apply-form.in-mailing-list`}</FormLabel>
              </HStack>
              <HStack>
                <SwitchForm id='is-public' {...register('isPublic')} />
                <FormLabel htmlFor='is-public'>{t`apply-form.show-in-website`}</FormLabel>
              </HStack>
            </Stack>

            {/* HEARD FROM */}
            <Box>
              <FormLabel>{t`apply-form.heard-from`}</FormLabel>
              <Stack p={4} rounded='lg' borderWidth={2} borderColor={errors.heardFrom ? 'red.400' : 'gray.400'}>
                {heardFrom.map(v => (
                  <HStack key={v.value}>
                    <CheckboxForm id={v.value} {...register(`heardFrom[${v.value}]`)} />
                    <FormLabel textTransform='capitalize' htmlFor={v.value}>
                      {v.label[locale]}
                    </FormLabel>
                  </HStack>
                ))}
              </Stack>
            </Box>

            {/* JOBS */}
            <Box>
              <FormLabel>{t`apply-form.subjects`}</FormLabel>
              <Stack
                spacing={8}
                rounded='lg'
                p={4}
                borderWidth={2}
                borderColor={errors.subjects ? 'red.500' : 'gray.400'}
              >
                {projectsQuery.data.map(p => (
                  <Stack key={p[`name_${locale}`]}>
                    <Text fontWeight='semibold'>{p[`name_${locale}`]}</Text>
                    {p.jobs.map(job => (
                      <HStack key={job.id}>
                        <CheckboxForm id={job.id} {...register(`subjects[${job.id}_${job.code}]`)} />
                        <FormLabel textTransform='capitalize' htmlFor={job.id}>
                          {job[`name_${locale}`]}
                        </FormLabel>
                      </HStack>
                    ))}
                  </Stack>
                ))}
                {errors.subjects && <Text fontSize='sm' color='red.500'>{t`apply-form.at-least-one`}</Text>}
              </Stack>
            </Box>
            <Button colorScheme='blue' size='lg' type='submit'>{t`apply-form.submit`}</Button>
          </Stack>

          {/* PROJECTS */}
          <Stack spacing={8}>
            <Heading as='h3' size='lg' textAlign='center' fontWeight='black'>
              {t`projects`}
            </Heading>
            <SimpleGrid gap={4} columns={2}>
              {projectsQuery.data.map(p => (
                <VStack key={p[`name_${locale}`]} p={8} spacing={4} bg='white' rounded='lg' shadow='md'>
                  <Avatar size='2xl' src={'http://api.samenvvv.nl' + p.image.data.attributes.url} />
                  <Heading size='md' as='h3'>
                    {p[`name_${locale}`]}
                  </Heading>
                  <Text textAlign='center' fontSize='sm'>
                    {p[`description_${locale}`]}
                  </Text>
                  <Spacer />
                  <Button as={Link} href={p.link} rel='noopener noreferrer' colorScheme='blue'>
                    {t`read-more`}
                  </Button>
                </VStack>
              ))}
            </SimpleGrid>
          </Stack>
        </SimpleGrid>
      </Container>
    </Layout>
  )
}

export const getStaticProps = context => {
  const seo = {
    title: {
      en: 'Join Us',
      nl: 'Doe Mee',
      tr: 'Bize Katılın',
    },
  }

  return {
    props: {
      title: seo.title[context.locale],
    },
  }
}

export default VolunteersJoin
