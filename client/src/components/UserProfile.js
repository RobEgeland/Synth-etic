import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const UserProfile = () => {
    const { currentUser, loggedIn } = useContext(UserContext)
    if (loggedIn === false) return <h1>Sign up or Log in to veiw your profile!</h1>
    if (!currentUser) return <div>Loading...</div>
  return (
    <div>
        <h1>Hi, {currentUser.username}!</h1>
        <h2>This is where you can veiw all of the sounds you have created</h2>
        {/* add list of sounds here */}
    </div>
  )
}

export default UserProfile