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
      <Button
        borderRightWidth={0}
        variant={currentCategory == null ? 'solid' : 'outline'}
        onClick={() => changeParam({ category: null })}
      >
        All
      </Button>
      {categories?.map((category, i) => (
        <Button
          borderRightWidth={i === categories.length - 1 ? 1 : 0}
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
