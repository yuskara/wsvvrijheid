import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  chakra,
  Code,
} from '@chakra-ui/react'
import { Container } from 'components/layout/container'
import { Layout } from 'components/layout/layout'
import { request } from 'lib'

const ExamplePage = ({ volunteers, authors, categories, arts, blog, filteredBlogs }) => {
  const data = [
    {
      name: 'Volunteers',
      data: volunteers,
    },
    {
      name: 'Authors',
      data: authors,
    },
    {
      name: 'Categories',
      data: categories,
    },
    {
      name: 'Arts with custom populate',
      query: { locale: 'tr', url: 'api/arts', populate: ['artist.user', 'artist.profile'] },
      data: arts,
    },
    {
      name: 'Blog Tweet Yardimcisi without Populate',
      query: {
        locale: 'tr',
        url: 'api/blogs',
        populate: [],
        filters: { slug: { $eq: 'tweet-yardimcisi' } },
      },
      data: blog,
    },
    {
      name: 'Blogs Includes Some Categories (Nested filters)',
      query: {
        locale: 'tr',
        url: 'api/blogs',
        filters: { categories: { code: { $in: ['iskence', 'hapishane-ihlalleri'] } } },
      },
      data: filteredBlogs,
    },
  ]

  return (
    <Layout>
      <Container>
        <Accordion my={32} allowToggle>
          {data.map(item => (
            <AccordionItem key={item.name}>
              <AccordionButton>
                <Box flex='1' textAlign='left' py={2} fontWeight='semibold'>
                  {item.name}
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4} fontSize='sm'>
                <Code p={4} maxH={500} w='full' overflow='auto' whiteSpace='pre'>
                  {item.query && <chakra.pre color='red.400'>{JSON.stringify(item.query, null, 2)}</chakra.pre>}
                  <pre>{JSON.stringify(item.data, null, 2)}</pre>
                </Code>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Layout>
  )
}

export default ExamplePage

export const getStaticProps = async () => {
  // const volunteers = await axios.get('https://api.samenvvv.nl/api/volunteers')
  const volunteers = await request({ url: 'api/volunteers' })
  const authors = await request({ url: 'api/authors' })
  const categories = await request({ url: 'api/categories' })

  /**
   * Asagidaki sorgunun standart axios ile sorgusu asagidaki gibi yapilabilir.
   * const arts = await axios.get('https://api.samenvvv.nl/api/arts?locale=tr&populate[0]=artist.user&populate[1]=artist.profile')
   */
  const arts = await request({ locale: 'tr', url: 'api/arts', populate: ['artist.user', 'artist.profile'] })

  /**
   * request fonksiyonu icinde populate default olarak (*) hepsini yapacak sekilde konmustu.
   * Burada populate: [] bos array vererek hic populate yapmamasini sagliyoruz.
   */
  const blog = await request({
    locale: 'tr',
    url: 'api/blogs',
    populate: [],
    filters: { slug: { $eq: 'tweet-yardimcisi' } },
  })

  /**
   * NESTED FILTRELEME
   * Ic ice (nested) sorgu denmesinin sebebi, filtrelemeyi
   * iliskili olan baska bir alan uzerinden yapiyoruz.
   * Ornegin yukaridaki slug filtrelemesi nested degil cunku slug direkt blogun verisi.
   * Fakat Kategoriye gore filtreleme olunca, kategori ayri bir tablo ve blog ile iliskili.
   *
   * PERFORMANS
   * Ic ice filtreleme performans sorunu olusturabilirmis
   * Strapi ic ice (nested) filtreler icin ozel route olusturmayi tavsiye ediyor.
   * Asagidaki sorgu iskence veya hapishane ihlalleri kategorisine sahip bloglari getiriyor
   */
  const filteredBlogs = await request({
    locale: 'tr',
    url: 'api/blogs',
    filters: { categories: { code: { $in: ['iskence', 'hapishane-ihlalleri'] } } },
  })

  return {
    props: {
      volunteers,
      authors,
      categories,
      arts,
      blog,
      filteredBlogs,
    },
  }
}
