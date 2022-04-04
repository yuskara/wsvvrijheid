import { Box } from '@chakra-ui/react'

//import { useTranslation } from 'react-i18next'
import { Layout } from '~components'
import { Login } from '~components'

const SignUp = ({ seo }) => {
    //   const { t } = useTranslation()

    return (
        <Layout seo={seo}>
            <Box minH='inherit'>
                <Login />
            </Box>
        </Layout>
    )
}

export default SignUp
