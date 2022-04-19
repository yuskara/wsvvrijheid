import { Avatar, Button, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { useChangeParams } from '~hooks'

export const CategoryFilter = ({ categories, currentCategory = null }) => {
  const changeParam = useChangeParams()
  const router = useRouter()

  return (
    <Stack justify='stretch' w='full'>
      <Text fontWeight='semibold'>Categories</Text>
      {[{ code: null, name_en: 'All', name_nl: 'Alle', name_tr: 'Tümü' }, ...categories]?.map(category => (
        <Button
          rounded='full'
          h={16}
          // TODO Provide category icon or image
          leftIcon={<Avatar name={category.code} size='sm' />}
          justifyContent='start'
          variant='outline'
          borderWidth={2}
          borderColor={category.code === currentCategory ? 'blue.500' : 'transparent'}
          key={category.id}
          onClick={() => changeParam({ category: category.code })}
        >
          {category[`name_${router.locale}`]}
        </Button>
      ))}
    </Stack>
  )
}
