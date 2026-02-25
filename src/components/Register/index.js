import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './index.css'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const url = `https://todoapplication-j07a.onrender.com/register`
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

      setError(data.message)

      navigate('/login')
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
            <h1>Register</h1>

            <div className="input-container">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>

            <div className="input-container">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Register</button>
            <p className="error">{error}</p>
          </form>
        </div>
        <div style={{textAlign: 'center', marginTop: 12}}>
          <Link to="/login">Already have an account? Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Register
