import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Stack,
  useBreakpointValue,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { Navigate } from '~components'

const ChildMenuItem = ({ item }) => {
  const { asPath } = useRouter()
  const { link, label } = item

  return (
    <Navigate
      href={link}
      fontWeight={600}
      px={2}
      py={{ base: 2, lg: 0 }}
      color={link !== '/' && asPath.includes(link) ? 'blue.500' : 'gray.700'}
      _hover={{ color: 'blue.500' }}
    >
      {label}
    </Navigate>
  )
}

const ParentMenuItem = ({ item }) => {
  return (
    <Popover trigger='hover' arrowSize={16}>
      <PopoverTrigger>
        <Navigate href={item.link} fontWeight={600}>
          {item.label}
        </Navigate>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            <Stack spacing={2}>
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
