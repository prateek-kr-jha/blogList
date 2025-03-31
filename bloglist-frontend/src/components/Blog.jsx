import { useState } from "react"

const Blog = ({ blog }) => {
  console.log(blog)
  const [showDetail, setShowDetail] = useState(false)
  const showWhenHidden = {display: showDetail ? 'none': ''}
  const showWhenVisible= {display: showDetail ? '': 'none'}
  const toggleShowDetail = () => {
    setShowDetail(!showDetail)
  }
  return (
  <div className="blog-container">
    <h4>
      {blog.title}
      <button style={showWhenHidden} onClick={toggleShowDetail}>View</button>
      <button style={showWhenVisible} onClick={toggleShowDetail}>Hide</button>
    </h4>
    <div style={showWhenVisible}>
      <h4>
        {blog.url}
      </h4>
      <h4>
        Likes {blog.likes}
      </h4>
      <h4>
        {blog.author}
      </h4>
    </div>

  </div> ) 
}

export default Blog