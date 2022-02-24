import { forwardRef, Link } from '@chakra-ui/react'
import NextLink from 'next/link'

export const Navigate = forwardRef(({ as: Tag = Link, href, children, ...rest }, ref) => {
  if (href) {
    if (href[0] === '/') {
      return (
        <NextLink href={href} passHref>
          <Tag cursor='pointer' {...rest} ref={ref}>
            {children}
          </Tag>
        </NextLink>
      )
    }

    return (
      <Tag cursor='pointer' as={Link} href={href} target='_blank' {...rest}>
        {children}
      </Tag>
    )
  }

  return <Link {...rest}>{children}</Link>
})
