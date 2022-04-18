import { Box } from '@chakra-ui/react'

export const MasonryGrid = props => {
  const { children } = props
  return (
    <Box
      padding={4}
      w='100%'
      mx='auto'
      // bg='gray.800'
      sx={{ columnCount: [1, 2, 3, 4, 5, 6, 7, 8], columnGap: '8px' }}
    >
      {children}
    </Box>
  )
}
