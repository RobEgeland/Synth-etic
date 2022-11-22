import React from 'react'
import { useState } from 'react'

const SignUp = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    age: "",
    password: "",
    password_confirmation: "", 
  })

  function handleChange(e) {
    setUser({
        ...user,
        [e.target.name]: e.target.value
    })
}
  return (
    <form className='-form' >
        <h1>Sign up for Liveify!</h1>
        
        <div>
            <label htmlFor='username'>Username</label>
            <br/>
            <input id="username" name='username' type={"text"} value={user.username} onChange={handleChange}  />
        </div>
        <div>
            <label htmlFor='email'>Email</label>
            <br/>
            <input id="email" name='email' type={"text"} value={user.email} onChange={handleChange}  />
        </div>
        <div>
            <label htmlFor='age'>Age</label>
            <br/>
            <input id="age" name='age' type={"text"} value={user.age} onChange={handleChange}  />
        </div>
        <div>
            <label htmlFor='password'>Password</label>
            <br/>
            <input id="password" name='password' type={"password"} value={user.password} onChange={handleChange}  />
        </div>
        <div>
            <label htmlFor='password_confirmation'>Confirm your Password</label>
            <br/>
            <input id="password_confirmation" name='password_confirmation' type={"password"}  value={user.password_confirmation} onChange={handleChange}  />
        </div>
        <br/>
        <input type={"submit"} value={"Sign Up"}/>
    </form>
  )
}

export default SignUp