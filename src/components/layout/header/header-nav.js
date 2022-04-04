import { Link, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { HEADER_MENU } from './header-menu'
import { HeaderNavItem } from './header-nav-item'

export const HeaderNav = ({ direction = 'row' }) => {
  const { locale } = useRouter()

  return (
    <Stack direction={direction}>
      {HEADER_MENU.map((item, i) => {
        return <HeaderNavItem key={i} item={item[locale]} />
      })}
      <Link href={'/sign-up'}>
        <Text>Sing Up</Text>
      </Link>
    </Stack>
  )
}
