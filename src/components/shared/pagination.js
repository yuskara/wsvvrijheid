import { Button, ButtonGroup } from '@chakra-ui/react'

import { useChangeParams } from '~hooks'

export const Pagination = ({ pageCount, currentPage }) => {
  const changeParam = useChangeParams()
  if (pageCount <= 1) return null

  return (
    // For now it's better to keep it simple (just page buttons)
    // We can add First, Last, Previous, Next buttons later
    <ButtonGroup isAttached colorScheme='blue'>
      {Array.from({ length: pageCount }, (v, i) => (
        <Button
          onClick={() => changeParam({ page: i + 1 })}
          variant={i + 1 === currentPage ? 'solid' : 'outline'}
          key={i}
        >
          {i + 1}
        </Button>
      ))}
    </ButtonGroup>
  )
}
