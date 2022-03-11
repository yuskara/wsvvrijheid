import { Box, Center, SimpleGrid, Spinner, Stack, Wrap } from '@chakra-ui/react'
import { Container, FilterButton, Layout, PageTitle, UserCard } from 'components'
import { request } from 'lib'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'

export default function Volunteers({ seo }) {
  const [job, setJob] = useState()
  const { t } = useTranslation()
  const { locale } = useRouter()

  const volunteersQuery = useQuery(
    'volunteers',
    () => request({ locale, url: 'api/volunteers', populate: ['user.avatar', 'jobs'] }),
    {
      select: useCallback(volunteers => {
        return volunteers.data.map(({ attributes }) => ({
          ...attributes,
          user: attributes.user.data?.attributes,
          jobs: attributes.jobs.data.map(({ id, attributes }) => ({
            id,
            ...attributes,
          })),
        }))
      }, []),
    },
  )

  const jobsQuery = useQuery('jobs', () => request({ locale, url: 'api/jobs' }), {
    select: useCallback(jobs => {
      return jobs.data.map(({ attributes }) => ({
        ...attributes,
      }))
    }, []),
  })

  const data = useMemo(
    () => volunteersQuery?.data?.filter(user => (job ? user.jobs?.some(j => j.code === job) : true)),
    [job, volunteersQuery?.data],
  )

  if (volunteersQuery.isLoading || jobsQuery.isLoading) return <Spinner />

  return (
    <Layout seo={seo}>
      <Box minH='inherit'>
        <Container minH='inherit' maxW='container.xl'>
          <PageTitle>{seo.title}</PageTitle>
          <Stack spacing={8}>
            <Wrap>
              <FilterButton
                isActive={job === undefined}
                number={jobsQuery.data.length}
                onClick={() => setJob(undefined)}
              >
                {t`all`}
              </FilterButton>
              {jobsQuery.data.map(j => (
                <FilterButton key={j.id} isActive={j.code === job} number={data.length} onClick={() => setJob(j.code)}>
                  {j[`name_${locale}`]}
                </FilterButton>
              ))}
            </Wrap>
            <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} gap={{ base: 4, lg: 8 }}>
              <Link href='/join' passHref>
                <Stack
                  role='group'
                  p={6}
                  spacing={4}
                  rounded='md'
                  bg='white'
                  w='full'
                  shadow='md'
                  align='center'
                  justify='center'
                  cursor='pointer'
                  minH={200}
                >
                  <Center
                    color='blue.500'
                    fontWeight='semibold'
                    fontSize='xl'
                    borderWidth={3}
                    borderColor='blue.500'
                    boxSize='full'
                    borderStyle='dashed'
                    transition='all 0.5s ease'
                    _groupHover={{ bg: 'blue.500', color: 'white', borderColor: 'white' }}
                  >
                    {t`joinTheTeam`}
                  </Center>
                </Stack>
              </Link>
              {data?.map((user, i) => (
                <UserCard key={i} user={user} />
              ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>
    </Layout>
  )
}

export const getStaticProps = async context => {
  const response = await request({ url: 'api/volunteers', populate: ['user.avatar', 'profile'] })

  const volunteers = response?.data || null

  const title = {
    en: 'Volunteers',
    nl: 'Vrijwillegers',
    tr: 'Gönüllüler',
  }

  const seo = {
    title: title[context.locale],
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['common'])),
      volunteers,
      seo,
    },
  }
}
