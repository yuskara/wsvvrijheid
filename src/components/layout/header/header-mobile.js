import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { FaBars } from 'react-icons/fa'

import { LocaleSwitcher } from '../locale-switcher'
import { HeaderNav } from './header-nav'

export const HeaderMobile = () => {
  const { isOpen, onToggle, onClose } = useDisclosure()

  return (
    <HStack display={{ base: 'flex', lg: 'none' }}>
      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <HeaderNav direction='column' />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <LocaleSwitcher />
      <IconButton variant='outline' colorScheme='blackAlpha' onClick={onToggle} aria-label='menu' icon={<FaBars />} />
    </HStack>
  )
}
