import React from 'react'
import { NavLink } from 'react-router-dom'

const SoundCard = ({sound, handleDelete}) => {
  return (
    <div className='sound_card'>
        <h1>{sound.sound_name}</h1>
        <br></br>
        <button onClick={() => handleDelete(sound.id)}>Delete</button>
        <NavLink to={`/${sound.id}`}><button>Update</button></NavLink>
    </div>
  )
}

export default SoundCard