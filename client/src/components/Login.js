import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const Login = () => {
    const {loggedIn, setLoggedIn, currentUser, setCurrentUser} = useContext(UserContext)
    console.log(currentUser.email)
    console.log(loggedIn)

    return (
        <div>
            <p>{currentUser.email}</p>
            <button onClick={() => {
                setLoggedIn(!loggedIn)
            }}>loggout</button>
        </div>
    )
}

export default Login