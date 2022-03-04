//import { AddIcon } from '@chakra-ui/icons'
import { Button, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

export const VolunterApplyCard = () => {
  const { t } = useTranslation()
  return (
    <VStack p={6} spacing={8} borderColor='gray.400' borderRadius='10%' boxShadow='dark-lg' rounded='md' bg='white'>
      <Button flex={1} p={16} h={100}>
        <Text fontSize='24px' fontWeight='bold' color='blue.500'>
          {t('joinTheTeam')}
        </Text>
      </Button>
    </VStack>
  )
}
