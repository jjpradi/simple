import React from 'react'

import {Link} from 'react-router-dom'

class Register extends React.Component {
  state = {username: '', password: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }
  onChangePassword = event => {
    this.setState({password: event.target.value})
  }
  handleSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    console.log(`Username: ${username}, Password: ${password}`)

    const userDetails = {username, password}

    const url = 'http://localhost:5000/register'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),

    }

    const response = await fetch(url, options)
    console.log(response)
    if (response.ok) {
      console.log('Registration successful')
      navigate('/login')


    } 
    else {
      console.log('Registration failed')
    }
  }
  render() {
    const {username, password} = this.state

    return (

      <div className="bg-container">
      <div className="login-container">
        {' '}
        <div className="card">
          <form onSubmit={this.handleSubmit}>
            <h1>Register</h1>

            <div className="input-container">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>

            <div className="input-container">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <button type="submit">Register</button>
          </form>
        </div>
        <Link to="/login">
          Already have an account? Login
          <button type="button">Sign in</button>
        </Link>
      </div>
      </div>
    )
  }
}

export default Register
