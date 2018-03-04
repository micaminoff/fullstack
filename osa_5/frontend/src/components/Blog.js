import React from 'react'
import blogService from '../services/blogs'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }
  }

  toggleVisibility = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  like = async () => {
    const changedBlog = {...this.props.blog, likes: this.props.blog.likes+1}
    blogService
      .update(changedBlog._id, changedBlog)
  }

  render() {
    const showWhenVisible = { display: this.state.expanded ? '' : 'none' }
    const blog = this.props.blog

    return (
      <div>
        <div className='blogStyle' onClick={this.toggleVisibility}>
          {blog.author} {blog.title}
          <div style={showWhenVisible}>
            {blog.url} <br />
            {blog.likes} likes <button onClick={this.like}>like</button><br />
            added by {blog.user.name}
          </div>
        </div>
      </div>
    )
  }
}

export default Blog