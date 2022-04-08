import { withIronSessionApiRoute } from 'iron-session/next'

import { sessionOptions } from '~lib'

async function userRoute(req, res) {
  if (req.session.token) {
    // in a real world application you might read the user id from the session
    // and then do a database request
    // to get more information on the user if needed
    res.json({
      user: req.session.user,
      token: req.session.token,
      isLoggedIn: true,
    })
  } else {
    res.json({
      isLoggedIn: false,
      token: null,
      user: null,
    })
  }
}

const handler = withIronSessionApiRoute(userRoute, sessionOptions)

export default handler
