export const getUserFromStorage = () => {
    const user = JSON.parse(localStorage.getItem("loggedUser"))
    return user
}

export const removeDataFromLocalStorage = () => {
    localStorage.removeItem("loggedUser")
}