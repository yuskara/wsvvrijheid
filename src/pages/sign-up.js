import { Box } from '@chakra-ui/react'

//import { useTranslation } from 'react-i18next'
import { Layout } from '~components'
import { SignUp } from '~components'

const Register = ({ seo }) => {
    //const { t } = useTranslation()

    return (
        <Layout seo={seo}>
            <Box minH='inherit'>
                <SignUp />
            </Box>
        </Layout>
    )
}

export default Register
