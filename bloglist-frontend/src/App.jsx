import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({ message, className }) => {
  if(message === null) {
    return null;
  }
  console.log(message,className)
  return (
    <div className={className}>
      {message}
    </div>
  )
}




const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [messageClass, setMessageClass] = useState(null)

  useEffect(() => {
    const loggedBlogAppUser = window.localStorage.getItem('loggedBlogAppUser');
    if(loggedBlogAppUser) {
      const user = JSON.parse(loggedBlogAppUser);
      setUser(user)
      blogService.setToken(user.token)
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )  
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username, password
      })
      if(user) {
        window.localStorage.setItem(
          'loggedBlogAppUser', JSON.stringify(user)
        )
  
        blogService.setToken(user.token);
        setUser(user);
        const blog_response = await blogService.getAll();
        setBlogs(blog_response)
      }
      setPassword('');
      setUsername('');
    } catch(e) {
      console.log(e);
      setMessageClass("error")
      setMessage("Wrong username or password")
      setTimeout(() => {
        setMessageClass(null)
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (e) => {
    e.preventDefault();
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
  }
  const LoginForm = () => {
    return (
      <div>
        <Notification className={messageClass} message={message} />
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
      </div>
    )
  }

  const BlogForm = () => {
    return (
      <div>
        <h2></h2>
      </div>
    )
  }


  if(user === null) {
    return LoginForm()
  }
  return (
    <div>
      <Notification className={messageClass} message={message} />
      <h2>blogs</h2>
        <div>{user.name} logged in <button type="submit" onClick={handleLogout}>Logout</button></div>
        <br/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )} 

    </div>
  )
}

export default App