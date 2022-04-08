import { Flex, Link, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
//import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { useUser } from '~hooks'

import { ProfileMenu } from './profil-menu'

export const Profile = () => {
  // const { locale } = useRouter()
  const resp = useUser()
  const { t } = useTranslation()
  return (
    <Flex py={1} justify='flex-end' margin='10px'>
      {resp.user?.user ? (
        <ProfileMenu />
      ) : (
        <Menu>
          <MenuButton>Login</MenuButton>
          <MenuList>
            <MenuItem as={Link} href={'/user/login'}>
              {t('profile.sign-in')}
            </MenuItem>
            <MenuItem as={Link} href={'/user/register'}>
              {t('profile.sign-up')}
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </Flex>
  )
}
