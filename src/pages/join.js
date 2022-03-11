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
  Textarea,
  useToast,
  Wrap,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Container, FormItem, Layout, PageTitle } from 'components'
import { instance, request } from 'lib'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { forwardRef, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { FaChevronRight } from 'react-icons/fa'
import { useMutation, useQuery } from 'react-query'
import * as yup from 'yup'

// FIXME Need to change type in backend as well
const hearedFrom = [
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
  yup.addMethod(yup.object, 'atLeastOneRequired', function (list, message) {
    return this.test({
      name: 'atLeastOneRequired',
      message,
      exclusive: true,
      params: { keys: list.join(', ') },
      test: value => value == null || list.some(f => !!value[f.value]),
    })
  })

  return yup.object().shape({
    fullname: yup.string().required(t`apply-form.name.required`),
    email: yup
      .string()
      .email(t`apply-form.email.invalid`)
      .required(t`apply-form.email.required`),
    phone: yup.string(),
    occupation: yup.string(),
    comment: yup.string(),
    inMailingList: yup.boolean(),
    isPublic: yup.boolean(),
    availableHours: yup.string().required(t`apply-form.available-hours.required`),
    hearedFrom: yup.object().shape(
      hearedFrom.reduce((acc, h) => {
        acc[h] = yup.bool()
        return acc
      }, {}),
    ),
    jobs: yup
      .object()
      .shape(
        jobs.reduce((acc, h) => {
          acc[h] = yup.bool()
          return acc
        }, {}),
      )
      .atLeastOneRequired(jobs, t`apply-form.jobs.required`),
  })
}

const SwitchForm = forwardRef(function SwitchForm(props, ref) {
  return <Switch ref={ref} {...props} />
})

const CheckboxForm = forwardRef(function CheckboxForm(props, ref) {
  return <Checkbox ref={ref} {...props} />
})

const VolunteersJoin = ({ title }) => {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const toast = useToast()

  const createVolunteerMutation = useMutation('create-volunteer', data =>
    instance.post(`${process.env.NEXT_PUBLIC_API_URL}/api/volunteers`, { data }),
  )

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
    reset,
  } = useForm({
    resolver: yupResolver(generateSchema(t, jobs)),
    mode: 'onTouched',
  })

  if (projectsQuery.isLoading) return <Spinner />

  const onSubmit = data => {
    const { fullname, email, phone, availableHours, inMailingList, isPublic, jobs, hearedFrom, comment, occupation } =
      data

    const mapObjToString = obj =>
      Object.entries(obj)
        .filter(([, v]) => v)
        .map(([k]) => k.split('_')[0])

    const hearedFromData = mapObjToString(hearedFrom).join(', ')
    const jobsData = mapObjToString(jobs)

    // TODO Create volunteer with data
    createVolunteerMutation.mutate(
      {
        username: Math.random().toString(),
        fullname,
        email,
        phone,
        comment,
        occupation,
        availableHours: availableHours || 0,
        inMailingList,
        public: isPublic,
        hearedFrom: hearedFromData,
        jobs: jobsData,
        publishedAt: null,
      },
      {
        onSuccess: () => {
          toast({
            status: 'success',
            title: t`apply-form.thanks.title`,
            description: t`apply-form.thanks.description`,
            position: 'top-right',
            isClosable: true,
            duration: 5000,
          })
          reset()
        },
        onError: () =>
          toast({
            status: 'error',
            title: t`apply-form.error.title`,
            description: t`apply-form.error.description`,
            position: 'top-right',
            isClosable: true,
            duration: 5000,
          }),
      },
    )
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
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <FormItem register={register} id='fullname' errors={errors} label={t`apply-form.name.input`} />
              <FormItem register={register} id='email' errors={errors} label={t`apply-form.email.input`} />
            </Stack>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <FormItem register={register} id='phone' errors={errors} label={t`apply-form.phone.input`} />
              <FormItem
                type='number'
                register={register}
                id='availableHours'
                errors={errors}
                label={t`apply-form.available-hours.input`}
              />
            </Stack>
            <FormItem register={register} id='occupation' label={t`apply-form.occupation`} />
            <FormItem as={Textarea} register={register} id='comment' label={t`apply-form.comment`} />

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

            {/* heared FROM */}
            <Box>
              <FormLabel fontSize='sm' fontWeight='semibold'>{t`apply-form.heard-from`}</FormLabel>
              <Wrap
                p={4}
                spacing={4}
                rounded='lg'
                borderWidth={2}
                borderColor={errors.hearedFrom ? 'red.400' : 'gray.100'}
              >
                {hearedFrom.map(v => (
                  <HStack key={v.value}>
                    <CheckboxForm id={v.value} {...register(`hearedFrom[${v.value}]`)} />
                    <FormLabel textTransform='capitalize' htmlFor={v.value}>
                      {v.label[locale]}
                    </FormLabel>
                  </HStack>
                ))}
              </Wrap>
            </Box>

            {/* JOBS */}
            <Box>
              <FormLabel fontSize='sm' fontWeight='semibold'>{t`apply-form.jobs.title`}</FormLabel>
              <Stack spacing={8} rounded='lg' p={4} borderWidth={2} borderColor={errors.jobs ? 'red.500' : 'gray.100'}>
                {projectsQuery.data.map((p, i) => (
                  <Stack key={i}>
                    <Text fontWeight='semibold' fontSize='sm'>
                      {p[`name_${locale}`]}
                    </Text>
                    {p.jobs.map(job => (
                      <HStack key={job.id}>
                        <CheckboxForm id={job.id} {...register(`jobs[${job.id}_${job.code}]`)} />
                        <FormLabel textTransform='capitalize' htmlFor={job.id}>
                          {job[`name_${locale}`]}
                        </FormLabel>
                      </HStack>
                    ))}
                  </Stack>
                ))}
                {errors.jobs && (
                  <Text fontSize='sm' color='red.500'>
                    {errors.jobs.message}
                  </Text>
                )}
              </Stack>
            </Box>
            <Button
              isLoading={createVolunteerMutation.isLoading}
              colorScheme='blue'
              size='lg'
              type='submit'
            >{t`apply-form.submit`}</Button>
          </Stack>

          {/* PROJECTS */}
          <Stack spacing={8}>
            {projectsQuery.data.map(p => (
              <HStack key={p[`name_${locale}`]} p={8} spacing={4} bg='white' rounded='lg' shadow='md'>
                <Avatar size='2xl' src={'http://api.samenvvv.nl' + p.image.data.attributes.url} />
                <Stack align='start'>
                  <Heading textAlign='center' size='md' as='h3' fontWeight='black'>
                    {p[`name_${locale}`]}
                  </Heading>
                  <Text fontSize='sm'>{p[`description_${locale}`]}</Text>
                  <Spacer />
                  <Button
                    rightIcon={<FaChevronRight />}
                    variant='link'
                    as={Link}
                    href={p.link}
                    rel='noopener noreferrer'
                    colorScheme='blue'
                  >
                    {t`read-more`}
                  </Button>
                </Stack>
              </HStack>
            ))}
          </Stack>
        </SimpleGrid>
      </Container>
    </Layout>
  )
}

export const getStaticProps = async context => {
  const seo = {
    title: {
      en: 'Join Us',
      nl: 'Doe Mee',
      tr: 'Bize Katılın',
    },
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['common'])),
      title: seo.title[context.locale],
    },
  }
}

export default VolunteersJoin
