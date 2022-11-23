import React from 'react'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'



const NavBar = () => {
  const {loggedIn, setLoggedIn, currentUser, setCurrentUser} = useContext(UserContext)
  // const [logIn, setLogIn] = loggedIn
  // const [current, setCurrentUser] = user
  function handClick() {
    fetch("/logout", {method: "DELETE"})
    setCurrentUser()
    setLoggedIn(false)
  }

  return (
    <div>
        <div className='navbar'>
            <a><NavLink to='/'>Home</NavLink></a>
            <a><NavLink to='/signup'>SignUp</NavLink></a>
            <a>{ currentUser ? <NavLink onClick={handClick} to='/'>LogOut</NavLink> : <NavLink to='/login'>LogIn</NavLink>}</a>
            <a><NavLink to='/explore'>Explore</NavLink></a>
            <a><NavLink to='/my-profile'>Profile</NavLink></a>
            <a className='navbar-right'><NavLink to='/ahhh'>Synth-etic</NavLink></a>
        </div>
    </div>
  )
}

export default NavBar