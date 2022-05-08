import { SimpleGrid, Skeleton, SkeletonText } from '@chakra-ui/react'
import React from 'react'

export const MasonryGridSkeleton = () => {
  return (
    <SimpleGrid mt={3} m={2}>
      <Skeleton size='5' h={Math.floor(Math.random() * (400 - 200 + 1)) + 200} />
      <SkeletonText mt='4' noOfLines={2} />
    </SimpleGrid>
  )
}
