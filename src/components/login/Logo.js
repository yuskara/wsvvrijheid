import { Image, Link } from '@chakra-ui/react'

export const Logo = () => (
    <Link href='/'>
        <Image
            width={{ base: '64px', lg: '92px' }}
            height={{ base: '64px', lg: '92px' }}
            objectFit='cover'
            src='/images/logo.svg'
            alt='Wsvv logo'
        />
    </Link>
)
