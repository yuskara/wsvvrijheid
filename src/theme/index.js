import { extendTheme } from '@chakra-ui/react'

import { styles } from './global'
import { mdx } from './mdx'

const fonts = { body: `'Rubik', sans-serif` }

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
  cssVarPrefix: 'wsvv',
}

const theme = extendTheme({
  config,
  fonts,
  components: {
    Heading: {
      baseStyle: {
        color: 'blue.500',
      },
    },
    Link: {
      baseStyle: {
        _hover: {
          textDecor: 'none',
        },
        textDecor: 'none',
      },
    },
  },
  styles,
  shadows: {
    outline: 'none',
    primary: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;',
  },
  mdx,
})

export default theme
