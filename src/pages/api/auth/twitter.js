import { withIronSessionApiRoute } from 'iron-session/next'

import { fetcher, sessionOptions } from '~lib'

const twitterRoute = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const response = await fetcher.get(`/api/auth/twitter/callback?access_token=${req.body.access_token}`)

            const user = { ...response.result.user, token: response.result.jwt }

            req.session = user
            await req.session.save()
            res.json(user)
        } catch (error) {
            console.error(error)
            if (!error.response?.data?.error.message) {
                return res.status(500).json({ message: 'Internal server error' })
            } else {
                const messages = error.response?.data?.error.message
                return res.status(403).json({ message: messages })
            }
        }
    }
}

const handler = withIronSessionApiRoute(twitterRoute, sessionOptions)

export default handler