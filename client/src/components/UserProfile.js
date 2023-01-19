import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import SoundCard from './SoundCard'

const UserProfile = ({sounds, setSounds}) => {
  const { currentUser, loggedIn } = useContext(UserContext)
  const userSounds = sounds.filter(sound => sound.user_id === currentUser.id)

  function handleDelete(id) {
    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
    const options = {
      method: "DELETE",
      headers
    }
    fetch(`/sounds/${id}`, options)
    const filteredSounds = sounds.filter(sound => sound.id !== id)
    setSounds(filteredSounds)
  }


  if (loggedIn === false) return <h1>Sign up or Log in to veiw your profile!</h1>
  if (!currentUser || !sounds) return <div>Loading...</div>
  return (
    <div>
        <h1>Hi, {currentUser.username}!</h1>
        <h2>This is where you can veiw all of the sounds you have created</h2>
        {/* add list of sounds here */}
        <br></br>
        <ul className='sound_card_list'>
          {userSounds.map(sound => <SoundCard handleDelete={handleDelete} sound={sound}/>)}
        </ul>
    </div>
  )
}

export default UserProfile