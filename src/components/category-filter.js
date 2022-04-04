import { Button, ButtonGroup } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { useChangeParams } from '~hooks'

export const CategoryFilter = ({ categories, currentCategory }) => {
  const changeParam = useChangeParams()
  const router = useRouter()

  return (
    // TODO: Change design of category filter to be placed on the left side of the page
    // It's just for demonstration purposes.
    <ButtonGroup isAttached colorScheme='blue'>
      {categories?.map(category => (
        <Button
          variant={category.code === currentCategory ? 'solid' : 'outline'}
          key={category.id}
          onClick={() => changeParam({ category: category.code })}
        >
          {category[`name_${router.locale}`]}
        </Button>
      ))}
    </ButtonGroup>
  )
}
