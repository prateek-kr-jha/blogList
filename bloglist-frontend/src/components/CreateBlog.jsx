const CreateBlog = ({
    title, 
    author,
    url,
    handleBlogSubmit,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange
}) => {
    return (
        <div>
          <h2>Create New</h2>
          <form onSubmit={handleBlogSubmit}>
            <div>
              title:
              <input 
                type="text"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div>
              author:
              <input 
                type="text"
                value={author}
                onChange={handleAuthorChange}
              />
            </div>
            <div>
              url:
              <input 
                type="url"
                value={url}
                onChange={handleUrlChange}
              />
            </div>
            <button type="submit">Create</button>
          </form>
        </div>
    )
}

export default CreateBlog