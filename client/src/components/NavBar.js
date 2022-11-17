import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {

    // function handleClick(e) {
    //     e.target.className = 'active'
    // }
  return (
    <div>
        <div className='navbar'>
            <a><NavLink to='/'>Home</NavLink></a>
            <a><NavLink to='/signup'>SignUp</NavLink></a>
            <a><NavLink to='/login'>LogIn</NavLink></a>
            <a><NavLink to='/explore'>Explore</NavLink></a>
            <a><NavLink to='/user'>Profile</NavLink></a>
            <a className=''></a>

        </div>
    </div>
  )
}

export default NavBar