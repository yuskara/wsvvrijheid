import { Navigate } from 'components'

export const FooterNavItem = props => {
  const { navItem } = props

  return (
    <Navigate
      color='blue.200'
      _hover={{
        color: 'blue.100',
      }}
      key={navItem.link}
      href={navItem.link}
    >
      {navItem.label}
    </Navigate>
  )
}
