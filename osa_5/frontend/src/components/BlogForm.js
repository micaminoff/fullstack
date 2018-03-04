import React from 'react'

const BlogForm = ({addBlog, author, handleChange, title, url}) => (
  <div>
    <h2>Add a new blog</h2>

    <form onSubmit={addBlog}>
      <div>
        Author:
          <input
          type="text"
          value={author}
          name="author"
          onChange={handleChange}
        />
      </div>
      Title:
          <input
        type="text"
        value={title}
        name="title"
        onChange={handleChange}
      />
      <br />
      Url:
          <input
        type="text"
        value={url}
        name="url"
        onChange={handleChange}
      />
      <br />
      <button type="submit">Save</button>
    </form>
  </div>
)
export default BlogForm