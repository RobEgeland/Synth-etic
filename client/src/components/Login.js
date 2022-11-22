import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
const Login = () => {
    const {loggedIn, currentUser} = useContext(UserContext)
    console.log(loggedIn)
    return (
        <div>
            <p>{loggedIn}</p>
        </div>
    )
}

export default Login