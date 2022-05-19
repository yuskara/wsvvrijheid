import { Image, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
export const HomeJustice = () => {
  const { t } = useTranslation()
  return (
    <Stack direction='row' bg={'transparent'}>
      <SimpleGrid columns={{ base: 1, lg: 2 }} justifyItems='center' gap={8}>
        <Image
          boxSize='400px'
          borderRadius='full'
          objectFit='cover'
          //src='/images/scales-of-justice.jpeg'
          src='/images/scales-of-justice.png'
          alt='/images/scales-of-justice.jpeg'
        />
        <Text fontSize='xl'>{t`home.justice`}</Text>
      </SimpleGrid>
    </Stack>
  )
}
