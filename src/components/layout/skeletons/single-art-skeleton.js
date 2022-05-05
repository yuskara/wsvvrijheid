import { SimpleGrid, Skeleton, SkeletonText } from '@chakra-ui/react'
import React from 'react'

export const SingleArtSkeleton = () => {
  return (
    <SimpleGrid w={{ base: '300px' }}>
      <Skeleton size='10' height={'400px'} />
      <SkeletonText mt='4' noOfLines={4} spacing='4' />
    </SimpleGrid>
  )
}
