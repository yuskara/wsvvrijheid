import nc from 'next-connect'

import { fetcher, sessionMiddleware } from '~lib'

const handler = nc()
  .use(sessionMiddleware)
  .post(async (req, res) => {
    if (req.method === 'POST') {
      try {
        const response = await fetcher.get(`/api/auth/twitter/callback?access_token=${req.body.access_token}`)

        const user = { ...response.result.user, token: response.result.jwt }
        if (!user.confirmed) {
          return res.status(401).json({
            statusCode: 401,
            message: 'User not confirmed',
          })
        }

        req.session.set('user', user)
        await req.session.save()
        res.json(user)
      } catch (error) {
        if (!error.response.data.error.message) {
          return res.status(500).json({ message: 'Internal server error' })
        } else {
          const messages = error.response.data.error.message
          return res.status(403).json({ message: messages })
        }
      }
    }
  })

export default handler
