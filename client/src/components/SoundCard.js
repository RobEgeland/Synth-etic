import React from 'react'

const SoundCard = ({sound, handleDelete}) => {
  return (
    <div className='sound_card'>
        <h1>{sound.sound_name}</h1>
        <br></br>
        <button onClick={() => handleDelete(sound.id)}>Delete</button>
        <button>Update</button>
    </div>
  )
}

export default SoundCard