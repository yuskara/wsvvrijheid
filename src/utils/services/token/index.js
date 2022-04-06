const baseUrl = '/api/users'

let token = null

export const setToken = newToken => {
    token = `Bearer ${newToken}`
}

export const getToken = () => {
    return token
}