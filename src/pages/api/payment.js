import { mollieClient, mutation } from 'lib'

export default async function handler(req, res) {
  const { amount, name, email, method, description } = req.body

  // Create blank donate in database
  const donate = await mutation.create('api/donates', {
    data: {
      name,
      email,
      amount,
      method,
      description,
    },
  })

  // Create mollie payment
  const payment = await mollieClient.payments.create({
    amount: {
      value: amount.toFixed(2),
      currency: 'EUR',
    },
    consumerName: name,
    method,
    billingEmail: email,
    metadata: {
      id: donate.data.data.id,
    },
    description: description ?? 'no description',
    redirectUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/donate/complete?id=${donate.data.data.id}`,
    webhookUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payment-status`,
  })

  await res.status(200).send(payment.getCheckoutUrl())
}
