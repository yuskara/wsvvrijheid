import { mollieClient, mutation } from 'lib'

export default async function handler(req, res) {
  const mollieId = req.body.id
  const payment = await mollieClient.payments.get(mollieId)

  // Update donation status and mollieId fields in database
  await mutation.edit('api/donates', payment.metadata.id, {
    data: { status: payment.status, mollieId },
  })

  //respond to Mollie with 200 or it keeps calling
  res.status(200).send('complete')
}
