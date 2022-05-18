import { Image, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
export const HomeJustice = () => {
  const { t } = useTranslation()
  return (
    <>
      <Image src='/images/scales-of-justice.jpg' />
      <Text fontSize='xl'>{t`home.justice`}</Text>
    </>
  )
}
