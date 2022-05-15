import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { Layout } from '~components'
import { useAuth } from '~hooks'

const AuthProvider = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  useAuth('/profile', true)
  const { query } = router
  useEffect(() => {
    if (query.provider && query.access_token) {
      axios
        .post(`/api/auth/${query.provider}`, {
          access_token: query.access_token,
        })
        .then(response => {
          if (response.data.token) {
            setLoading(true)
            router.push('/')
          }
        })
        .catch(error => {
          console.error('error', error)
        })
    }
  }, [router])
  return <Layout isLoading={loading} />
}

export default AuthProvider
