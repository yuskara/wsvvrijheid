import axios from 'axios'
import Router from 'next/router'
import { useEffect } from 'react'
import { useQuery } from 'react-query'

export const useUser = (redirectTo = '', redirectIfFound = false) => {
    const { data: response, isLoading } = useQuery('me', () => axios.post('/api/auth/user'))

    const user = response?.data

    useEffect(() => {
        // if no redirect needed, just return (example: already on /dashboard)
        // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
        if (!redirectTo || !user?.isLoggedIn) return
        if (
            // If redirectTo is set, redirect if the user was not found.
            (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
            // If redirectIfFound is also set, redirect if the user was found
            (redirectIfFound && user?.isLoggedIn)
        ) {
            Router.push(redirectTo)
        }
    }, [user, redirectIfFound, redirectTo])

    return { user, isLoading }
}