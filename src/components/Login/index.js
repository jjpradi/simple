import Cookies from 'js-cookie'
import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './index.css'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const onChangeUsername = event => setUsername(event.target.value)
  const onChangePassword = event => setPassword(event.target.value)

  const handleSubmit = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const url = `https://todoapplication-j07a.onrender.com/login`
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    console.log(response)
    let text = await response.text()

    if (response.ok) {
      const data = JSON.parse(text)
      const token = data.jwtToken || data.jwt_token || data.jwt
      Cookies.set('jwt_token', token, {expires: 30})
      setError(data.message || 'Login successful')

      navigate('/')
    } else {
      // Only show specific backend messages

      setError(text)
    }
  }

  return (
    <div className="bg-container">
      <div className="login-container">
        <div className="card">
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="input-container">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={onChangeUsername}
              />
            </div>
            <div className="input-container">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={onChangePassword}
              />
            </div>
            <button type="submit">Login</button>
            <p style={{color: 'red'}} className="error">
              {error}
            </p>
          </form>
        </div>
        <Link to="/register">
          Don&apos;t have an account? Register
          <button type="button">Sign in</button>
        </Link>
      </div>
    </div>
  )
}

export default Login
