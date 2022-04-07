import nc from 'next-connect'

import { mutation, sessionMiddleware } from '~lib'

const handler = nc()
  .use(sessionMiddleware)
  .post(async (req, res) => {
    const { identifier, password } = req.body

    try {
      const response = await mutation.post(`api/auth/local`, {
        identifier,
        password,
      })
      console.log('response', response)
      const user = { ...response.data.user, token: response.data.jwt }

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
      console.log('error', error.message)
      if (!error.response?.data.error.message) {
        return res.status(500).json({ message: 'Internal server error' })
      } else {
        const messages = error.response.data.error.message
        return res.status(403).json({ message: messages })
      }
    }
  })

export default handler
