import { useState } from "react"

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  console.log(blog)
  const [showDetail, setShowDetail] = useState(false)
  const showWhenHidden = {display: showDetail ? 'none': ''}
  const showWhenVisible= {display: showDetail ? '': 'none'}
  const toggleShowDetail = () => {
    setShowDetail(!showDetail)
  }

  const addLike = () => {
    console.log('like')
  }

  const deleteBlog = () => {
    console.log('delete')
  }
  return (
  <div style={blogStyle}>
    <div>
      {blog.title}
      <button style={showWhenHidden} onClick={toggleShowDetail}>View</button>
      <button style={showWhenVisible} onClick={toggleShowDetail}>Hide</button>
    </div>
    <div style={showWhenVisible}>
      <div>
        {blog.url}
      </div>
      <div>
        Likes {blog.likes} <button onClick={addLike}>Likes</button>
      </div>
      <div>
        {blog.author}
      </div>
      <button type="button">Delete</button>
    </div>
  </div> ) 
}

export default Blog