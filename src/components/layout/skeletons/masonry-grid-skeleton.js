import { SimpleGrid, Skeleton, SkeletonText } from '@chakra-ui/react'
import React from 'react'

export const MasonryGridSkeleton = () => {
  return (
    <SimpleGrid mt={3} w={'200px'} m={2}>
      <Skeleton size='5' height={'250px'} />
      <SkeletonText mt='4' noOfLines={2} spacing='4' />
    </SimpleGrid>
  )
}
