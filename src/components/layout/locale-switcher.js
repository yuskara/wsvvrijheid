import { Button, ButtonGroup } from '@chakra-ui/react'
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
    <ButtonGroup spacing={0} size='sm' alignItems='center'>
      {locales.map(code => {
        if (slug && (!slug?.[code] || !slug?.[code]?.[0])) return null

        return (
          <Button
            key={code}
            px={2}
            onClick={() => handleChangeLanguage(code)}
            colorScheme={locale === code ? 'blue' : 'blackAlpha'}
            variant={locale === code ? 'outline' : 'ghost'}
          >
            {code.toUpperCase()}
          </Button>
        )
      })}
    </ButtonGroup>
  )
}
