import React from 'react'

const ExploreCard = ({sound}) => {
    return (
        <div className='sound_card'>
            <h1>{sound.sound_name}</h1>
            <br></br>
            <h3>by: {sound.user.username}</h3>
            <button>play</button>
        </div>
    )
}

export default ExploreCard