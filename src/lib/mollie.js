import { createMollieClient } from '@mollie/api-client'

// https://github.com/mollie/mollie-api-node#a-note-on-use-outside-of-nodejs
export const mollieClient =
  typeof window === 'undefined' && createMollieClient({ apiKey: process.env.NEXT_PUBLIC_MOLLIE })
