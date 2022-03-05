import { Navigate } from 'components'

export const FooterNavItem = props => {
  const { navItem } = props

  return (
    <Navigate
      color='blue.400'
      _hover={{
        color: 'blue.400',
      }}
      key={navItem.link}
      href={navItem.link}
    >
      {navItem.label}
    </Navigate>
  )
}
