import { Box, Button, ButtonGroup, VisuallyHidden } from '@chakra-ui/react'
import { FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa'
const providers = [
  {
    name: 'Google',
    icon: <Box as={FaGoogle} color='red.500' boxSize='5' />,
  },
  {
    name: 'Twitter',
    icon: <Box as={FaTwitter} color='twitter.500' boxSize='5' />,
  },
  {
    name: 'Facebook',
    icon: <Box as={FaFacebook} color='facebook.500' boxSize='5' />,
  },
]

export const OAuthButtonGroup = () => (
  <ButtonGroup variant='outline' spacing='4' width='full'>
    {providers.map(({ name, icon }) => (
      <Button key={name} isFullWidth>
        <VisuallyHidden>Sign in with {name}</VisuallyHidden>
        {icon}
      </Button>
    ))}
  </ButtonGroup>
)
