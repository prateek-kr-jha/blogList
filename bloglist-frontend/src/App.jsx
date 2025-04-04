import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/Login'
import Togglable from './components/Togglable'
import CreateBlog from './components/CreateBlog'


// functionality to increase likes
// sort on number of likes
// functionality to delete post

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

  const handleLogin = async (userDetails) => {
    
    try {
      const user = await loginService.login(userDetails)
      if(user) {
        window.localStorage.setItem(
          'loggedBlogAppUser', JSON.stringify(user)
        )
  
        blogService.setToken(user.token);
        setUser(user);
        const blog_response = await blogService.getAll();
        setBlogs(blog_response)
      }

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

  const handleLikeButton = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const returnedBlog = await blogService.modify(blog);
    if(returnedBlog) {
      const idx = blogs.findIndex(b => b.id === id);
      const newBlogs = [...blogs];
      newBlogs[idx] = returnedBlog;
      setBlogs(newBlogs);
    }
  }
  const loginForm = () => {

    return (
      <Togglable buttonLabel='login'>
         <LoginForm 
            handleLogin={handleLogin}
          />
      </Togglable>
    )
  }

  const addBlog = async (blogObj) => {
    try {
      const blog = await blogService.create(blogObj)
      setBlogs(blogs.concat(blog))
      setMessageClass("notification")
      setMessage(`a new blog ${blog.title} by ${blog.author} added`);
      setTimeout(() => {
        setMessageClass(null)
        setMessage(null)
      }, 5000)
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
          addBlog={addBlog}
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
            <Blog key={blog.id} blog={blog} id={blog.id} handleLikeButton={handleLikeButton} />
        )} 

    </div>
  )
}

export default App