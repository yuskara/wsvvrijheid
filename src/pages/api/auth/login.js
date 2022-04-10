import { withIronSessionApiRoute } from 'iron-session/next'

import { fetcher, sessionOptions } from '~lib'

const loginRoute = async (req, res) => {
  const { identifier, password } = req.body

  try {
    const response = await fetcher.post(`api/auth/local`, {
      identifier,
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
      res.json(error.response?.data)
    }
  }
}

const handler = withIronSessionApiRoute(loginRoute, sessionOptions)

export default handler
