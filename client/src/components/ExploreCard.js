import React from 'react'
import { NavLink } from 'react-router-dom'

const ExploreCard = ({sound}) => {
    return (
        <div className='sound_card'>
            <h1>{sound.sound_name}</h1>
            <br></br>
            <h3>by: {sound.user.username}</h3>
            <NavLink to={`/${sound.id}`}><button className='play_button'>play</button></NavLink>
        </div>
    )
}

export default ExploreCard