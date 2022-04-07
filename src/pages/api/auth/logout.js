import { withIronSessionApiRoute } from 'iron-session/next'

import { sessionOptions } from '~lib'

async function logoutRoute(req, res) {
  req.session.destroy()
  res.json({ isLoggedIn: false, token: null })
}

const handler = withIronSessionApiRoute(logoutRoute, sessionOptions)

export default handler
