import { Box, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import React from 'react'

export const SkeletonGrid = ({ type, length = 3 }) => {
  if (type === 'category-filter') {
    return (
      <Box padding='6' boxShadow='lg'>
        {Array.from({ length }).map((_, i) => (
          <Box key={'category-filter' + i} display={'flex'} flexDirection={'row'} mt={i == 0 ? 0 : 4}>
            <SkeletonCircle size='8' />
            <SkeletonText mt='4' noOfLines={1} spacing='4' w={'80%'} ml={2} />
          </Box>
        ))}
      </Box>
    )
  } else if (type === 'masonry-grid') {
    return (
      <Box padding='6' boxShadow='lg' display={'flex'} flexDirection={'row'} justifyContent={'space-evenly'}>
        {Array.from({ length }).map((_, i) => (
          <Box key={'masonry-grid' + i} w={'25%'} m={2}>
            <Skeleton size='10' height={'200px'} />
            <SkeletonText mt='4' noOfLines={4} spacing='4' />
          </Box>
        ))}
      </Box>
    )
  } else if (type === 'single-art') {
    return (
      <Box padding='2' boxShadow='lg' w={'300px'}>
        <Skeleton size='10' height={'400px'} />
        <SkeletonText mt='4' noOfLines={4} spacing='4' />
      </Box>
    )
  } else if (type === 'similar-arts') {
    return (
      <Box padding='6' boxShadow='lg'>
        {/* It will be handled after the component is created */}
      </Box>
    )
  } else if (type === 'comments') {
    return (
      <Box padding='6' boxShadow='lg'>
        {/* It will be handled after the component is created */}
      </Box>
    )
  }
}
