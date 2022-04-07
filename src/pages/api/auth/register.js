import { withIronSessionApiRoute } from 'iron-session/next'

import { mutation, sessionOptions } from '~lib'

const registerRoute = async (req, res) => {
    console.log("Register user router", req, "response", res)
    const { username, email, password } = req.body

    try {
        const response = await mutation.post(`api/auth/local/register`, {
            username,
            email,
            password,
        })

        const user = { user: response.data.user, isLoggedIn: true, token: response.data.jwt }

        req.session = user
        await req.session.save()
        res.json(user)
    } catch (error) {
        console.log('error', error)
        if (!error.response?.data?.error.message) {
            return res.status(500).json({ message: 'Internal server error' })
        } else {
            const messages = error.response?.data?.error.message
            return res.status(403).json({ message: messages })
        }
    }
}

const handler = withIronSessionApiRoute(registerRoute, sessionOptions)

export default handler