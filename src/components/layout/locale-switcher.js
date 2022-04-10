import { Button, ButtonGroup, HStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export const LocaleSwitcher = ({}) => {
  const { locales, push, pathname, locale, asPath, components } = useRouter()

  const slug =
    components?.[pathname]?.props?.pageProps?.pageData?.slugs || components?.[pathname]?.props?.pageProps?.slug

  // TODO: Redirect to localized path for static pages
  const handleChangeLanguage = async locale => {
    await push(pathname, slug?.[locale]?.join('/') || asPath, { locale })
  }

  return (
    <HStack justify='flex-end'>
      <ButtonGroup isAttached d='flex' size='xs' alignItems='center'>
        {locales.map(code => {
          if (slug && (!slug?.[code] || !slug?.[code]?.[0])) return null

          return (
            <Button
              key={code}
              size='xs'
              onClick={() => handleChangeLanguage(code)}
              colorScheme={locale === code ? 'blue' : 'blackAlpha'}
              variant={locale === code ? 'solid' : 'ghost'}
            >
              {code.toUpperCase()}
            </Button>
          )
        })}
      </ButtonGroup>
    </HStack>
  )
}
