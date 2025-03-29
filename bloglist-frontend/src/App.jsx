import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/Login'
import Togglable from './components/Togglable'
import CreateBlog from './components/CreateBlog'

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
  const [loginVisible, setLoginVisible] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [messageClass, setMessageClass] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
  const loginForm = () => {
    // const hideWhenVisible = { display: loginVisible ? 'none': '' }
    // const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <Togglable buttonLabel='login'>
         <LoginForm 
            username={username}
            password={password}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handleSubmit={handleLogin}
          />
      </Togglable>
    )
  }

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    try {
      const blog = await blogService.create({
        title,
        author,
        url
      })
      console.log(blog, "----------------------------------");
      setBlogs(blogs.concat(blog))
      setMessageClass("notification")
      setMessage(`a new blog ${blog.title} by ${blog.author} added`);
      setTimeout(() => {
        setMessageClass(null)
        setMessage(null)
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')

    } catch(e) {
      console.log(e);
      setMessageClass("error")
      setMessage("")
      setTimeout(() => {
        setMessageClass(null)
        setMessage(null)
      }, 5000)
    }
  }

  const BlogForm = () => {
    return (
      <Togglable buttonLabel='New Blog'>
        <CreateBlog
          handleBlogSubmit={handleBlogSubmit}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)}
        />
      </Togglable>
    )
  }


  if(user === null) {
    return (
      <div>
        <Notification className={messageClass} message={message} />
        {loginForm()}
      </div>
    )
  }
  return (
    <div>
      <Notification className={messageClass} message={message} />
      <h2>blogs</h2>
        <div>{user.name} logged in <button type="submit" onClick={handleLogout}>Logout</button></div>
        <br />
        {BlogForm()}
        <br/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )} 

    </div>
  )
}

export default App