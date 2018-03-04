import React from 'react'

const LoginForm = ({ login, handleChange, username, password }) => {
  return (
    <div>
      <h2>LOGIN NOW!</h2>

      <form onSubmit={login}>
        <div>
          Username:
        <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div>
          Password:
        <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm