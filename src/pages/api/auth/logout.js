import nc from 'next-connect'

import { sessionMiddleware } from '~lib'

const handler = nc()
  .use(sessionMiddleware)
  .post(async (req, res) => {
    req.session.destroy()
    res.send()
  })

export default handler
