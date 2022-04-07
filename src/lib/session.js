export const sessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieName: 'iron-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}
