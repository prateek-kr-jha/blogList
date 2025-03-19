import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import blogs from './services/blogs'


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
        console.log(user, "user-------------------------")
        blogService.setToken(user.token);
        setUser(user);
        const blog_response = await blogService.getAll();
        console.log(blog_response, "=-------------------");
        setBlogs(blog_response)
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

  // const Blogs = async () => {
  //   // const blogs = await blogService.getAll();
  //   return (
  //     <div>
  //       <h2>blogs</h2>
  
  //       {blogs.map(blog =>
  //         <Blog key={blog.id} blog={blog} />
  //       )} 
  //     </div>
  //   )
  // }

  return (
    <div>
      {user === null && LoginForm()}
      <h2>blogs</h2>
  
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )} 

    </div>
  )
}

export default App