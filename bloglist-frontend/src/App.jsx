import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const LoginForm = (username, password) => {
  return (
    <form>
      Log into application
      <div>
        username
        <input
          type = "text"
          value = {username}
          onChange = {({ target }) => set}
        />
      </div>
      <div>

      </div>
    </form>
  )
}

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

  const LoginForm = () => {
    return (
      <form>
        Log into application
        <div>
          username
          <input
            type = "text"
            value = {username}
            onChange = {({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
  
        </div>
      </form>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App