import { Container, SimpleGrid } from '@chakra-ui/react'
import { Card, Layout, PageTitle } from 'components'
import { request } from 'lib'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Projects({ title, projects }) {
  return (
    <Layout scrollHeight={100} seo={{ title }}>
      <Container maxW='container.lg' centerContent>
        <PageTitle>{title}</PageTitle>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 6, lg: 8 }} mb={16}>
          {projects.map(project => (
            <Card
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              link={project.link}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Layout>
  )
}
export const getStaticProps = async context => {
  const { locale } = context
  const response = await request({ url: 'api/projects' })

  const projects = response.data
    ? response.data.map(({ id, attributes }) => ({
        id,
        ...attributes,
        title: attributes[`name_${locale}`],
        description: attributes[`description_${locale}`],
        // TODO URL should be given through env
        image: 'https://api.samenvvv.nl' + attributes.image.data.attributes.url,
      }))
    : null

  const seo = {
    title: {
      en: 'Projects',
      nl: 'Projecten',
      tr: 'Projeler',
    },
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      title: seo.title[locale],
      projects,
    },
  }
}
