import React from 'react'
import { useState } from 'react'

const SignUp = () => {
  const [errors, setErrors] = useState()
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
    fetch('/users', options)
    .then(res => {
        if(res.ok){
            res.json().then(data => {
              console.log(data)
            })
        }else {
            res.json().then(error => {
                console.log(error.errors)
                const errorAr = []
                for (const element in error.errors) {
                    errorAr.push(` ${element} ${error.errors[element]} -`)
                }
                setErrors(errorAr)

                throw new Error(errors)
            })
        }
    })
  }
  return (
    <div className='form-body'>
      <form className='signup-form' onSubmit={handleSubmit} >
          <h1 className='login-title'>Sign up for Synth-etic!</h1>
          {errors ? <div className='error'>{errors}</div> : null}
          <div>
              <label className='signup-placeholder' htmlFor='username'>Username</label>
              <br/>
              <input className='input'  id="username" name='username' type={"text"} value={user.username} onChange={handleChange}  />
          </div>
          <div>
              <label className='signup-placeholder'  htmlFor='email'>Email</label>
              <br/>
              <input className='input'  id="email" name='email' type={"text"} value={user.email} onChange={handleChange}  />
          </div>
          <div>
              <label className='signup-placeholder'  htmlFor='age'>Age</label>
              <br/>
              <input className='input'  id="age" name='age' type={"text"} value={user.age} onChange={handleChange}  />
          </div>
          <div>
              <label className='signup-placeholder'  htmlFor='password'>Password</label>
              <br/>
              <input className='input'  id="password" name='password' type={"password"} value={user.password} onChange={handleChange}  />
          </div>
          <div>
              <label className='signup-placeholder'  htmlFor='password_confirmation'>Confirm your Password</label>
              <br/>
              <input className='input'  id="password_confirmation" name='password_confirmation' type={"password"}  value={user.password_confirmation} onChange={handleChange}  />
          </div>
          <br/>
          <input className='submit' type={"submit"} value={"Sign Up"}/>
      </form>
    </div>
  )
}

export default SignUp