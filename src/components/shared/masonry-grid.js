import { Box } from '@chakra-ui/react'

export const MasonryGrid = props => {
  const { children, gap = 4 } = props
  return (
    <Box w='full' sx={{ columnCount: [1, 2, 3, 4, 5], columnGap: gap }}>
      <Box sx={{ breakInside: 'avoid' }} mb={gap}>
        {children}
      </Box>
    </Box>
  )
}
