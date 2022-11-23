import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import augh from '../static/augh.mp3'



const NavBar = () => {
  const [click, setClick] = useState(0)
  
  const audio = new Audio(augh)
  const {loggedIn, setLoggedIn, currentUser, setCurrentUser} = useContext(UserContext)
  // const [logIn, setLogIn] = loggedIn
  // const [current, setCurrentUser] = user
  function handLogOut() {
    fetch("/logout", {method: "DELETE"})
    setCurrentUser()
    setLoggedIn(false)
  }

  function handleClick() {
    setClick(() => click + 1)
    if(click === 2) {
      audio.play()
    }

  }
  setTimeout(() => {
    setClick(0)
    if(audio.play){
      audio.pause()
    }
  }, 4000)

  return (
    <div>
        <div className='navbar'>
            <a><NavLink to='/'>Home</NavLink></a>
            <a><NavLink to='/signup'>SignUp</NavLink></a>
            <a>{ currentUser ? <NavLink onClick={handLogOut} to='/'>Log Out</NavLink> : <NavLink to='/login'>Log In</NavLink>}</a>
            <a><NavLink to='/explore'>Explore</NavLink></a>
            <a><NavLink to='/my-profile'>Profile</NavLink></a>
            <a className='navbar-right'><NavLink onClick={handleClick} to='/ahhh'>Synth-etic</NavLink></a>
        </div>
    </div>
  )
}

export default NavBar