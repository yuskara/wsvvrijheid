import { Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { ListHeader } from './footer'
import { FOOTER_MENU } from './footer-menu'
import { FooterNavItem } from './footer-nav-item'

export const FooterNav = () => {
  const { locale } = useRouter()
  const { t } = useTranslation()
  return (
    <>
      {FOOTER_MENU.map((item, i) => {
        return (
          <Stack key={i} align={{ base: 'center', sm: 'start' }} marginX={4} fontSize='lg' color={'blue.300'} py={4}>
            <ListHeader>{t(item[locale].label)}</ListHeader>
            {item[locale].children.map((item, j) => {
              return <FooterNavItem key={j} navItem={item} />
            })}
          </Stack>
        )
      })}
    </>
  )
}
