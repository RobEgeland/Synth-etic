import React from 'react'
import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { useHistory } from 'react-router-dom'

const Login = () => {
    const history = useHistory()
    const {loggedIn, setLoggedIn, currentUser, setCurrentUser} = useContext(UserContext)
    const [errors, setErrors] = useState()
    const [user, setUser] = useState({
        username: "",
        password: ""
    })
    
    function handleChange(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
        const options = {
            method: "POST",
            headers,
            body: JSON.stringify(user)
        }
        fetch('/login', options)
        .then(res => {
            if(res.ok){
                res.json().then(data => {
                    setCurrentUser(data)
                    setLoggedIn(true)
                    history.push("/")
                })
            }else {
                res.json().then(error => {
                    setErrors(error.errors)
                })
            }
        })
    }

    return (
        <form className='artist-form' onSubmit={handleSubmit} >
            <h1>Log In</h1>
            {loggedIn ? null : <div className='error'>{errors}</div>}
            <div>
                    <label htmlFor='username'>Username</label>
                    <br/>
                    <input id="username" name='username' type={"text"} value={user.username} onChange={handleChange}  />
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <br/>
                <input id="password" name='password' type={"password"} value={user.password} onChange={handleChange}  />
            </div>
            <input type={"submit"} value={"Log In"}/>
        </form>
    )
}

export default Login