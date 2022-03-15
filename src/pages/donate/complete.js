import { Alert, AlertDescription, AlertIcon, AlertTitle, Center } from '@chakra-ui/react'
import { Container, Layout } from 'components'
import { mollieClient, request } from 'lib'

const DonationResult = ({ status, title, description }) => (
  <Alert
    status={status}
    variant='subtle'
    flexDirection='column'
    alignItems='center'
    justifyContent='center'
    textAlign='center'
    height='200px'
  >
    <AlertIcon boxSize='40px' mr={0} />
    <AlertTitle mt={4} mb={1} fontSize='lg'>
      {title}
    </AlertTitle>
    <AlertDescription maxWidth='sm'>{description}</AlertDescription>
  </Alert>
)

// TODO Make transaction detail messages more user friendly and create translations
const PaymentComplete = ({ transaction }) => {
  const renderStatus = () => {
    if (transaction?.status === 'paid') {
      return <DonationResult title='Thank you' description='We received your donation' status='success' />
    }

    if (transaction?.status === 'open') {
      return (
        <DonationResult
          status='warning'
          title='Payment not completed!'
          description='It seems your payment has not been competed'
        />
      )
    }

    if (transaction?.status === 'expired') {
      return <DonationResult status='warning' title='Expired' description='Payment link has been expired' />
    }

    if (transaction?.status === 'canceled') {
      return <DonationResult status='info' title='Cancelled' description='You canceled the donation' />
    }

    if (transaction?.status === 'failed') {
      return <DonationResult status='error' title='Failed' description='Transaction failed' />
    }

    return (
      <DonationResult
        status='warning'
        title='Not found'
        description='Transaction could not been found. Please contact!'
      />
    )
  }

  return (
    <Layout>
      <Container maxWidth='container.sm'>
        <Center minH='70vh'>{renderStatus()}</Center>
      </Container>
    </Layout>
  )
}

export const getServerSideProps = async context => {
  // TODO We may change finding method from `id` to uniqe `key`
  // property to avoid random requests by users
  // `/donate/complete?id=2` => will show the result of the donation
  // `/donate/complete?key=<uuid4> => this can be better approach

  // Find the donate by giving id from mollie's redirectUrl
  const donate = await request({ url: `api/donates/${context.query.id}` })

  const payment = await mollieClient.payments.get(donate.data.attributes.mollieId)

  return {
    props: {
      transaction: {
        id: payment.id,
        status: payment.status,
        method: payment.method,
      },
    },
  }
}

export default PaymentComplete
