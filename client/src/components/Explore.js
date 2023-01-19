import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const Explore = () => {
    const { currentUser, loggedIn } = useContext(UserContext)
    if (loggedIn === false) return <h1>Sign up or Log in to veiw Explore!</h1>
    return (
        <div>
            <h1>Welcome to the explore page!</h1>
            <h2>Check out cools sounds other people are making</h2>
        </div>
    )
}

export default Explore