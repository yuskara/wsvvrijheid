import { Container, SimpleGrid } from '@chakra-ui/react'
import { Card, Layout, PageTitle } from 'components'
import { PROJECTS } from 'data'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Projects({ title, content, seo }) {
  return (
    <Layout scrollHeight={100} seo={seo}>
      <Container maxW='container.lg' centerContent>
        <PageTitle>{title}</PageTitle>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 6, lg: 8 }} mb={16}>
          {content.map(({ title, description, image, button, link }, i) => (
            <Card key={i} title={title} description={description} image={image} button={button} link={link} />
          ))}
        </SimpleGrid>
      </Container>
    </Layout>
  )
}
export const getStaticProps = async context => {
  const { locale } = context

  const pageData = PROJECTS[locale]

  const seo = {
    title: pageData.title,
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      title: pageData.title,
      content: pageData.content,
      seo,
    },
  }
}
