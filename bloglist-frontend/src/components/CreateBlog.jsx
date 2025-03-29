import { useState } from 'react'

const CreateBlog = ({
    addBlog
}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const handleBlogSubmit = async (e) => {
        e.preventDefault();
        addBlog({
            title,
            author,
            url
        })

        setTitle('')
        setAuthor('')
        setUrl('')
    }
    return (
        <div>
          <h2>Create New</h2>
          <form onSubmit={handleBlogSubmit}>
            <div>
              title:
              <input 
                type="text"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
            <div>
              author:
              <input 
                type="text"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
              />
            </div>
            <div>
              url:
              <input 
                type="url"
                value={url}
                onChange={({ target }) => setUrl(target.value)}
              />
            </div>
            <button type="submit">Create</button>
          </form>
        </div>
    )
}

export default CreateBlog