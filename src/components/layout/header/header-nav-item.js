import {
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Stack,
  useBreakpointValue,
} from '@chakra-ui/react'
import { Navigate } from 'components/shared/navigate'
import { useRouter } from 'next/router'

const ChildMenuItem = ({ item }) => {
  const { asPath } = useRouter()
  const { link, label } = item

  return (
    <Navigate
      href={link}
      fontWeight={600}
      p={2}
      color={link !== '/' && asPath.includes(link) ? 'blue.400' : 'gray.700'}
      _hover={{ color: 'blue.400' }}
    >
      {label}
    </Navigate>
  )
}

const ParentMenuItem = ({ item }) => {
  return (
    <Popover trigger='hover' arrowSize={16}>
      <PopoverTrigger>
        <Link fontWeight={600} p={2}>
          {item.label}
        </Link>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            <Stack>
              {item.children.map(item => (
                <ChildMenuItem key={item.link} item={item} />
              ))}
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}

export const HeaderNavItem = ({ item }) => {
  const isMobile = useBreakpointValue({ base: true, lg: false })

  const isParentLink = item.children

  if (isParentLink) {
    if (isMobile)
      return (
        <>
          {item.children.map(child => (
            <ChildMenuItem key={child.link} item={child} />
          ))}
        </>
      )
    return <ParentMenuItem item={item} />
  }

  return <ChildMenuItem item={item} />
}
