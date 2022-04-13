import { Container, SimpleGrid } from '@chakra-ui/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Card, Layout, PageTitle, Pagination } from '~components'
import { request } from '~lib'

export default function Activities({ activities, query, title }) {
  return (
    <Layout scrollHeight={100} seo={{ title }}>
      <Container maxW='container.lg' centerContent>
        <PageTitle>{title}</PageTitle>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 6, lg: 8 }} mb={16}>
          {activities.result.map(activity => (
            <Card
              key={activity.id}
              title={activity.title}
              description={activity.content}
              image={activity.image.url}
              link={activity.link}
            />
          ))}
        </SimpleGrid>
        <Pagination
          pageCount={activities.pagination.pageCount}
          currentPage={+query.page}
          changeParam={() => changeParam({ page })}
        />
      </Container>
    </Layout>
  )
}
export const getServerSideProps = async context => {
  const { locale, query } = context
  const { category, page = 1, sort = [] } = query
  const filters = category && { categories: { code: { $eq: category } } }

  const activities = await request({
    url: 'api/activities',
    filters,
    page,
    pageSize: 2,
    sort,
    locale,
  })

  console.log('-------------' + query)
  console.log(query)

  const allCategories = await request({
    url: 'api/categories',
    pageSize: 1,
    locale,
  })

  const activitiesCategories = allCategories.result.filter(category => category.activities?.length > 0)

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
      query: context.query,
      categories: activitiesCategories,
      activities,
    },
  }
}
