import { Box, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import React from 'react'

export const SkeletonGrid = ({ type }) => {
  if (type === 'CategoryFilter') {
    return (
      <Box padding='6' boxShadow='lg' bg='white'>
        <Box display={'flex'} flexDirection={'row'}>
          <SkeletonCircle size='8' />
          <SkeletonText mt='4' noOfLines={1} spacing='4' w={'80%'} ml={2} />
        </Box>
        <Box display={'flex'} flexDirection={'row'} mt={4}>
          <SkeletonCircle size='8' />
          <SkeletonText mt='4' noOfLines={1} spacing='4' w={'80%'} ml={2} />
        </Box>
        <Box display={'flex'} flexDirection={'row'} mt={4}>
          <SkeletonCircle size='8' />
          <SkeletonText mt='4' noOfLines={1} spacing='4' w={'80%'} ml={2} />
        </Box>
      </Box>
    )
  } else if (type === 'MasonryGrid') {
    return (
      <Box padding='6' boxShadow='lg' bg='white' display={'flex'} flexDirection={'row'} justifyContent={'space-evenly'}>
        <Box w={'25%'}>
          <Skeleton size='10' height={'200px'} />
          <SkeletonText mt='4' noOfLines={4} spacing='4' />
        </Box>
        <Box w={'25%'}>
          <Skeleton size='10' height={'200px'} />
          <SkeletonText mt='4' noOfLines={4} spacing='4' />
        </Box>
        <Box w={'25%'}>
          <Skeleton size='10' height={'200px'} />
          <SkeletonText mt='4' noOfLines={4} spacing='4' />
        </Box>
      </Box>
    )
  } else if (type === 'SingleArt') {
    return (
      <Box padding='2' boxShadow='lg' bg='white' w={'300px'}>
        <Skeleton size='10' height={'400px'} />
        <SkeletonText mt='4' noOfLines={4} spacing='4' />
      </Box>
    )
  } else if (type === 'SimilarArts') {
    return (
      <Box padding='6' boxShadow='lg' bg='white'>
        {/* It will be handled after the component is created */}
      </Box>
    )
  } else if (type === 'Comments') {
    return (
      <Box padding='6' boxShadow='lg' bg='white'>
        {/* It will be handled after the component is created */}
      </Box>
    )
  }
}
