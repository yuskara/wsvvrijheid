
export const setToken = (token) => {
    localStorage.setItem("token", token)
    console.log("token saved in local storage")
}