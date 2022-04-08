import { Avatar, Link, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React from 'react'

import { useUser } from '~hooks'

export const ProfileMenu = () => {
  const resp = useUser('/', true)
  const router = useRouter()
  const { t } = useTranslation()

  const logOut = async e => {
    e.preventDefault()
    axios.post('/api/auth/logout').then(() => {
      router.push('/user/login')
    })
  }
  return (
    <Menu>
      <MenuButton>
        <Avatar name={resp ? resp?.user?.user?.username : ''}> </Avatar>
      </MenuButton>
      <MenuList>
        <MenuItem> {resp ? resp?.user?.user?.username : ''} </MenuItem>
        <MenuGroup title={t('profile.title')}>
          <MenuItem as={Link} href={'/profile'}>
            {' '}
            {t('profile.my-profile')}{' '}
          </MenuItem>
          <MenuItem> {t('profile.my-arts')} </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title='Help'>
          <MenuItem>Docs</MenuItem>
          <MenuItem>FAQ</MenuItem>
        </MenuGroup>
        <MenuItem color='red.400' onClick={logOut}>
          {' '}
          {t('profile.logout')}
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
