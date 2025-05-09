import { useState } from "react"

const Blog = ({ blog, id, handleLikeButton, handleDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  console.log(id)
  const [showDetail, setShowDetail] = useState(false)
  const showWhenHidden = {display: showDetail ? 'none': ''}
  const showWhenVisible= {display: showDetail ? '': 'none'}
  const toggleShowDetail = () => {
    setShowDetail(!showDetail)
  }

  const addLike = (e) => {
    console.log('like');
    console.log(e.target.id, "--------------------------");
    handleLikeButton(e.target.id);
  }

  const deleteBlog = (e) => {
    handleDelete(e.target.dataset.id);
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
          Likes {blog.likes} <button onClick={addLike} id={id}>Like</button>
        </div>
        <div>
          {blog.author}
        </div>
        <button type="button" onClick={deleteBlog} data-id={id}>Remove</button>
      </div>
    </div> 
  ) 
}

export default Blog