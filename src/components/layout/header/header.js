import { Box, Flex, Image, Link } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Headroom from 'react-headroom'

import { Container } from '../container'
import { LocaleSwitcher } from '../locale-switcher'
import { Profile } from '../profile'
import { HeaderMobile } from './header-mobile'
import { HeaderNav } from './header-nav'

export const Header = () => {
  return (
    <Headroom style={{ zIndex: 999 }}>
      <Flex
        bg='white'
        borderBottomWidth={1}
        borderBottomColor='blackAlpha.300'
        transition='all 0.3s ease-in-out'
        align='center'
        h={{ base: '64px', lg: '100px' }}
      >
        <Container>
          <Flex justify='space-between' align='center' pos='relative'>
            <motion.div animate={{ rotate: -360 }} transition={{ ease: 'linear', repeat: Infinity, duration: 60 }}>
              <Link href='/'>
                <Image
                  width={{ base: '64px', lg: '92px' }}
                  height={{ base: '64px', lg: '92px' }}
                  objectFit='cover'
                  src='/images/logo.svg'
                  alt='Wsvv logo'
                />
              </Link>
            </motion.div>
            <Box display={{ base: 'none', lg: 'block' }}>
              <Flex py={1} justify='flex-end'>
                <LocaleSwitcher />
                <Profile />
              </Flex>
              <HeaderNav />
            </Box>
            <HeaderMobile />
          </Flex>
        </Container>
      </Flex>
    </Headroom>
  )
}
