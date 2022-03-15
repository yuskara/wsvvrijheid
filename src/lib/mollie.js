const { default: createMollieClient } = require('@mollie/api-client')

export const mollieClient = createMollieClient({ apiKey: process.env.NEXT_PUBLIC_MOLLIE })
