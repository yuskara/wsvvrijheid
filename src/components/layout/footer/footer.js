import { Box, Link, SimpleGrid, Stack, Text, Wrap } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import NextImage from 'next/image'
import { useTranslation } from 'react-i18next'

import { SocialButtons } from '~components'

import { Container } from '../container'
import { FooterNav } from './footer-nav'

export const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={600} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  )
}

export const Footer = () => {
  const { t } = useTranslation()
  return (
    <Box bg={'blue.900'} color='blue.200' pos='relative'>
      <Container as={Stack}>
        <SimpleGrid columns={{ sm: 2, md: 5 }} spacing={4} py={10}>
          <Stack align='center'>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{
                ease: 'linear',
                repeat: Infinity,
                duration: 60,
              }}
            >
              <Link href='/'>
                <NextImage width='92px' height='92px' objectFit='cover' src='/images/logo.svg' alt='Wsvv logo' />
              </Link>
            </motion.div>
            <Text textAlign='center' color={'white'} paddingLeft={1} mx={2} my={2}>
              {t('footer_about')}
            </Text>
          </Stack>
          <FooterNav />
        </SimpleGrid>
        <Wrap
          justify={{ base: 'center', sm: 'space-between' }}
          borderTopWidth='1px'
          borderTopColor='whiteAlpha.500'
          py={6}
          spacing={2}
        >
          <Text fontSize={'sm'} mr={1}>
            &copy; {new Date().getFullYear()} {t('copyright')}
          </Text>
          <SocialButtons />
        </Wrap>
      </Container>
    </Box>
  )
}
