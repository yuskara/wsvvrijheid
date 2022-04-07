import { Button, Code } from '@chakra-ui/react'
import axios from 'axios'
import { withIronSessionSsr } from 'iron-session/next'
import { useRouter } from 'next/router'
import React from 'react'

import { Container, Layout } from '~components'
import { sessionOptions } from '~lib'

const Profile = ({ user }) => {
    const router = useRouter()
    const onLogout = () => {
        axios.post('/api/auth/logout').then(() => {
            router.push('/login')
        })
    }
    return (
        <Layout>
            <Container>
                <pre>
                    <Code>{JSON.stringify(user, null, 2)}</Code>
                </pre>
                <Button onClick={onLogout}>Logout</Button>
            </Container>
        </Layout>
    )
}

export default Profile

export const getServerSideProps = withIronSessionSsr(async function ({ req }) {
    const user = req.session.user

    if (!user) {
        return {
            redirect: {
                permanent: false,
                destination: '/login',
            },
            props: {},
        }
    }

    return {
        props: { user },
    }
}, sessionOptions)