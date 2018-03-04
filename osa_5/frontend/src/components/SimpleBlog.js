import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className="basic">
      {blog.title} {blog.author}
    </div>
    <div className="involved">
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog