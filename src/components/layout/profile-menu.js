import { Avatar, Button, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FiLogIn } from 'react-icons/fi'

import { Navigate } from '~components'
import { useAuth } from '~hooks'

export const ProfileMenu = () => {
  const { user } = useAuth()
  const { t } = useTranslation()
  const router = useRouter()

  const logOut = async e => {
    e.preventDefault()
    axios.post('/api/auth/logout').then(() => {
      router.push('/user/login')
    })
  }

  if (!user)
    return (
      <Navigate as={Button} size='sm' colorScheme='blue' rightIcon={<FiLogIn />} href={'/user/login'}>
        {t('profile.sign-in')}
      </Navigate>
    )

  return (
    <Menu>
      <MenuButton>
        <Avatar boxSize={{ base: 10, lg: 12 }} rounded='lg' name={user.username}></Avatar>
      </MenuButton>
      <MenuList>
        <MenuItem>{user.username}</MenuItem>
        <MenuGroup title={t('profile.title')}>
          <MenuItem as={Navigate} href={'/profile'}>
            {t('profile.my-profile')}
          </MenuItem>
          <MenuItem>{t('profile.my-arts')}</MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuItem color='red.400' onClick={logOut}>
          {t('profile.logout')}
        </MenuItem>
      </MenuList>
    </Menu>
  )
}