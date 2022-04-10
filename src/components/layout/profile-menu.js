import { Avatar, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { Navigate } from '~components'
import { useUser } from '~hooks'

export const ProfileMenu = () => {
  const { user } = useUser()
  const { t } = useTranslation()
  const router = useRouter()

  const logOut = async e => {
    e.preventDefault()
    axios.post('/api/auth/logout').then(() => {
      router.push('/user/login')
    })
  }

  if (!user?.user) return <Navigate href={'/user/login'}>{t('profile.sign-in')}</Navigate>

  return (
    <Menu>
      <MenuButton>
        <Avatar name={user.user.username}> </Avatar>
      </MenuButton>
      <MenuList>
        <MenuItem>{user.user.username}</MenuItem>
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
