import { useState } from 'react'

const LoginForm = ({
    handleLogin
}) => {
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = (e) => {
      e.preventDefault();
      handleLogin({
        username, 
        password
      })
      setPassword('');
      setUsername('');
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
              <h1>
                Log into application
              </h1>
              <div>
                username
                <input
                  type = "text"
                  value = {username}
                  onChange = {({ target }) => setUsername(target.value)}
                />
              </div>
              <div>
                password
                <input
                  type = "password"
                  value = {password}
                  onChange = {({ target }) => setPassword(target.value)}
                />
              </div>
              <button type="submit">login</button>
            </form>
        </div>
    )
}


export default LoginForm