
import { Container, SimpleGrid } from '@chakra-ui/react'
import { Card, Layout, PageTitle } from 'components'
import { request } from 'lib'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'



export default function activities({ title, activities }) {
  const { locale } = useRouter()
  return (
    <Layout scrollHeight={100} seo={{ title }}>
      <Container maxW='container.lg' centerContent>
        <PageTitle>{title}</PageTitle>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 6, lg: 8 }} mb={16}>
          {activities.map(activity => (
            <Card
              key={activity.id}
              title={activity[`name_${locale}`]}
              description={activity[`description_${locale}`]}
              image={activity.image.url}
              link={activity.link}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Layout>
  )
}
export const getStaticProps = async context => {
  const { locale } = context
  const activities = await request({ url: 'api/activities' })

  const seo = {
    title: {
      en: 'Activities',
      nl: 'Activiteiten',
      tr: 'Faaliyetler',
    },
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      title: seo.title[locale],
      activities,
    },
  }
}

