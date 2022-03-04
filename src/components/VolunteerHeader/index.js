import { Box, Heading, HStack, Image, Link, Stack, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

export const VolunteerHeader = () => {
  const { t } = useTranslation()
  return (
    <>
      <Heading>{t('contributors.header')}</Heading>
      <HStack direction={['column', 'row']} margin={10} spacing={8}>
        <Image
          src='https://almanac.httparchive.org/static/images/avatars/1.jpg'
          alt=''
          height='100'
          width='100'
          loading='lazy'
        ></Image>
        <Image
          src='https://almanac.httparchive.org/static/images/avatars/8.jpg'
          alt=''
          height='100'
          width='100'
          loading='lazy'
        ></Image>
        <Image
          src='https://almanac.httparchive.org/static/images/avatars/4.jpg'
          alt=''
          height='100'
          width='100'
          loading='lazy'
        ></Image>
        <Image
          src='https://almanac.httparchive.org/static/images/avatars/0.jpg'
          alt=''
          height='100'
          width='100'
          loading='lazy'
        ></Image>
        <Image
          src='https://almanac.httparchive.org/static/images/avatars/11.jpg'
          alt=''
          height='100'
          width='100'
          loading='lazy'
        ></Image>
      </HStack>
    </>
  )
}
