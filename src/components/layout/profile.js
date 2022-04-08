import { Avatar, Flex, Link, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from '@chakra-ui/react'
//import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { useUser } from '~hooks'

export const Profile = () => {
  // const { locale } = useRouter()
  const resp = useUser()
  const { t } = useTranslation()

  const logOut = async e => {
    e.preventDefault()
    axios.post('/api/auth/logout').then(() => {
      router.push('/user/login')
    })
  }
  return (
    <Flex py={1} justify='flex-end' margin='10px'>
      {resp.user?.user ? (
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
            <MenuItem color='red.400' onClick={logOut}>
              {' '}
              {t('profile.logout')}
            </MenuItem>
          </MenuList>
        </Menu>
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
