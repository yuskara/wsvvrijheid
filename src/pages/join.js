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
  Stack,
  Switch,
  Text,
  VStack,
  Wrap,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Container, FormItem, Layout, PageTitle } from 'components'
import { PROJECTS } from 'data'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { forwardRef } from 'react'
import { useForm } from 'react-hook-form'
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

// TODO Consider replacing jobs.json data with subjects
const subjects = [
  {
    label: {
      en: 'Translator',
      nl: 'Tolk',
      tr: 'Çevirmen',
    },
    value: 'translator',
    selected: false,
  },
  {
    label: {
      en: 'Blog Writer',
      nl: 'Blog Schrijver',
      tr: 'Blog Yazarı',
    },
    value: 'blog_writer',
    selected: false,
  },
  {
    label: {
      en: 'Twitter Analyst',
      nl: 'Twitter Analist',
      tr: 'Twitter Analisti',
    },
    value: 'twitter_analyst',
    selected: false,
  },
  {
    label: {
      en: 'SEO Analyst',
      nl: 'SEO Analist',
      tr: 'SEO Analisti',
    },
    value: 'seo_analyst',
    selected: false,
  },
  {
    label: {
      en: 'Art Creator',
      nl: 'Kunst Schepper',
      tr: 'Sanatkar',
    },
    value: 'art_creator',
    selected: false,
  },
  {
    label: {
      en: 'Web Developer',
      nl: 'Web Ontwikkelar',
      tr: 'Web Geliştirici',
    },
    value: 'web_developer',
    selected: false,
  },
  {
    label: {
      en: 'Graphic Designer',
      nl: 'Grafisch Ontwerper',
      tr: 'Grafik Tasarımcısı',
    },
    value: 'graphic_designer',
    selected: false,
  },
]

yup.addMethod(yup.object, 'atLeastOneRequired', function (list) {
  return this.test({
    name: 'atLeastOneRequired',
    message: '${path} must have at least one of these keys: ${keys}',
    exclusive: true,
    params: { keys: list.join(', ') },
    test: value => value == null || list.some(f => !!value[f.value]),
  })
})

const schema = t =>
  yup.object().shape({
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
    subjects: yup
      .object()
      .shape(
        subjects.reduce((acc, h) => {
          acc[h] = yup.bool()
          return acc
        }, {}),
      )
      .atLeastOneRequired(subjects),
  })

const SwitchForm = forwardRef(function SwitchForm(props, ref) {
  return <Switch ref={ref} {...props} />
})

const CheckboxForm = forwardRef(function CheckboxForm(props, ref) {
  return <Checkbox ref={ref} {...props} />
})

const VolunteersJoin = () => {
  // TODO Add all translations
  const { t } = useTranslation()
  const { locale } = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema(t)),
    mode: 'all',
  })

  const onSubmit = data => {
    // TODO Remove logs
    console.log(data)

    const mapDataToString = data =>
      Object.entries(data)
        .filter(([, v]) => v)
        .map(([k]) => k)
        .join(', ')

    const heardFromData = mapDataToString(data.heardFrom)
    const subjectsData = mapDataToString(data.subjects)
    console.log('heardFromData', heardFromData)
    console.log('subjectsData', subjectsData)

    // TODO Create volunteer with data
  }

  console.log('errors', errors)

  return (
    <Layout>
      <Container>
        <PageTitle>Join Us</PageTitle>
        <SimpleGrid mb={8} gap={8} columns={{ base: 1, lg: 2 }} alignItems='start'>
          {/* FORM */}
          <Stack p={8} bg='white' rounded='lg' shadow='md' as='form' spacing={4} onSubmit={handleSubmit(onSubmit)}>
            <Heading as='h3' size='lg' textAlign='center' fontWeight='black'>
              Apply Form
            </Heading>
            <FormItem register={register} id='name' errors={errors} label='Name' />
            <FormItem register={register} id='email' errors={errors} label='Email' />
            <FormItem register={register} id='phone' errors={errors} label='Phone' />
            <FormItem type='number' register={register} id='availableHours' errors={errors} label='Available Hours' />

            <Wrap justify='space-between'>
              <HStack>
                <SwitchForm id='in-mailing-list' {...register('inMailingList')} />
                <FormLabel htmlFor='in-mailing-list'>In mailing list</FormLabel>
              </HStack>
              <HStack>
                <SwitchForm id='is-public' {...register('isPublic')} />
                <FormLabel htmlFor='is-public'>Show in website</FormLabel>
              </HStack>
            </Wrap>

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

            {/* SUBJECTS */}
            <Box>
              <FormLabel>{t`apply-form.subjects`}</FormLabel>
              <Stack rounded='lg' p={4} borderWidth={2} borderColor={errors.subjects ? 'red.500' : 'gray.400'}>
                {subjects.map(v => (
                  <HStack key={v.value}>
                    <CheckboxForm id={v.value} {...register(`subjects[${v.value}]`)} />
                    <FormLabel textTransform='capitalize' htmlFor={v.value}>
                      {v.label[locale]}
                    </FormLabel>
                  </HStack>
                ))}
                {errors.subjects && <Text fontSize='sm' color='red.500'>{t`apply-form.at-least-one`}</Text>}
              </Stack>
            </Box>
            <Button colorScheme='blue' size='lg' type='submit'>{t`apply-form.submit`}</Button>
          </Stack>

          {/* PROJECTS */}
          <Stack spacing={8}>
            <Heading as='h3' size='lg' textAlign='center' fontWeight='black'>
              {PROJECTS[locale].title}
            </Heading>
            <SimpleGrid gap={4} columns={2}>
              {PROJECTS[locale].content.map(p => (
                <VStack key={p.title} p={8} spacing={4} bg='white' rounded='lg' shadow='md'>
                  <Avatar size='lg' src={p.image} />
                  <Heading size='md' as='h3'>
                    {p.title}
                  </Heading>
                  <Text textAlign='center' fontSize='sm'>
                    {p.description}
                  </Text>
                  <Spacer />
                  <Button as={Link} href={p.link} rel='noopener noreferrer' colorScheme='blue'>
                    Read more
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

export default VolunteersJoin
