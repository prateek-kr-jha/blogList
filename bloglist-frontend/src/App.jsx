import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(username, password, "-----------------");
    try {
      const user = await loginService.login({
        username, password
      })
      if(user) {
        setUser(user);
      }
      setPassword('');
      setUsername('');
    } catch(e) {
      console.log(e);
    }
  }

  const LoginForm = () => {
    return (
      <form onSubmit={handleLogin}>
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
    )
  }

  return (
    <div>
      {user === null ? LoginForm() : <h1>Logged in</h1>}
      {/* <h2>blogs</h2>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )} */}
    </div>
  )
}

export default App