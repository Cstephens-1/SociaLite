import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import styled from 'styled-components'
import Social from "/home/cory/Development/phase4project/FaceBook2/client/src/Social.png"

function Login({ setCurrentUser }) {
  // const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const handleSubmit = (event) => {
    event.preventDefault()
    fetch('login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    })
      .then(res => {
        if (res.ok) {
          res.json().then(user => {
            setCurrentUser(user)
            // history.push('/groups')
          })
        } else {
          res.json().then(errors => {
            console.error(errors)
          })
        }
      })
  }
  return (
      <FormWrapper>
    <div className="authForm">
      <Redirect to="/" />
      <form onSubmit={handleSubmit}>
        <img src= {Social} alt="logo" />
        <p>
          <label 
            htmlFor="username"
          >
            Username:
          </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </p>
        <p>
          <label 
            htmlFor="password"
          >
            Password:
          </label>
          <input
            type="password"
            name=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </p>
        <p><ButtonStyler type="submit">Log In</ButtonStyler></p>
        <p>-- or --</p>
        <p><ButtonStyler><Link to="/signup">Sign Up</Link></ButtonStyler></p>
      </form>
    </div>
      </FormWrapper>
  )
}

export default Login

const ButtonStyler = styled.button`
    border-radius: 8px;
    font-size: 20px;
    margin-top: 10px;
`
const FormWrapper = styled.div`
margin-top: 250px;
  /* background-color: black; */
`


