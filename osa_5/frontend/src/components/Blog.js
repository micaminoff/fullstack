import React from 'react'

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

  render() {
    const showWhenVisible = { display: this.state.expanded ? '' : 'none' }
    const blog = this.props.blog

    return (
      <div>
        <div className='blogStyle' onClick={this.toggleVisibility}>
          {blog.author} {blog.title}
          <div style={showWhenVisible}>
            {blog.url} <br />
            {blog.likes} likes <button onClick={this.props.likeHandler}>like</button><br />
            added by {blog.user.name}
            <button onClick={this.props.deleteButton}> Delete </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Blog