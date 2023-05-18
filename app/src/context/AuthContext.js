import { createContext, useContext, useState } from "react"

//create the context
const AuthContext = createContext()

//create the hook
const useAuth = () => useContext(AuthContext)

//create the provider
const AuthProvider = ({ children }) => {

    //get the user from local storage
    const userObj = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    const isLoggedIn= localStorage.getItem('user') ? true : false

    //state
    const [user, setUser] = useState(userObj)
    const [isLogged, setIsLogged] = useState(isLoggedIn)

    //data
    const data = {
        user, setUser,
        isLogged, setIsLogged
    }

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}

export { useAuth }

export default AuthProvider