import React from 'react'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'



const NavBar = () => {
  const {loggedIn, currentUser} = useContext(UserContext)
  // const [logIn, setLogIn] = loggedIn
  // const [current, setCurrentUser] = user
  console.log(loggedIn)
  console.log(currentUser)

  return (
    <div>
        <div className='navbar'>
            <a><NavLink to='/'>Home</NavLink></a>
            <a><NavLink to='/signup'>SignUp</NavLink></a>
            <a><NavLink to='/login'>LogIn</NavLink></a>
            <a><NavLink to='/explore'>Explore</NavLink></a>
            <a><NavLink to='/user'>Profile</NavLink></a>
            <a className='navbar-right'><NavLink to='/ahhh'>Synth-etic</NavLink></a>
        </div>
    </div>
  )
}

export default NavBar