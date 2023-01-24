import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import ExploreCard from './ExploreCard'

const Explore = ({sounds}) => {
    const { currentUser, loggedIn } = useContext(UserContext)

    const exploreSounds = sounds.filter(sound => sound.id !== currentUser.id)
    if (loggedIn === false) return <h1>Sign up or Log in to veiw Explore!</h1>
    if (!currentUser || !sounds) return <div>Loading...</div>
    return (
        <div>
            <h1>Welcome to the explore page!</h1>
            <h2>Check out cools sounds other people are making</h2>
            <br></br>
            <ul className='sound_card_list'>
                {exploreSounds.map(sound => <ExploreCard key={sound.id} sound={sound}/> )}
            </ul>
        </div>
    )
}

export default Explore