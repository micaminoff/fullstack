import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      author: '',
      title: '',
      url: '',
      error: null,
      type: ''
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleBlogChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
        type: 'error'
      })
      setTimeout(() => {
        this.setState({ error: null, type: '' })
      }, 5000)
    }
  }

  addBlog = (event) => {
    event.preventDefault()
    const blogObj = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }

    blogService
      .create(blogObj)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          author: '', title: '', url: '',
          error: ('New blog \'' + newBlog.title + '\' by ' + newBlog.author + ' created.'),
          type: 'success'
        })
        setTimeout(() => {
          this.setState({ error: null, type: '' })
        }, 5000)
      })
  }

  handleLike = (id) => {
    return () => {
      const blog = this.state.blogs.find(b => b._id === id)
      const updated = { ...blog, likes: blog.likes + 1 }

      blogService
        .update(id, updated)
        .then(updated => {
          this.setState({
            blogs: this.state.blogs.map(blog => blog._id !== id ? blog : updated)
          })
        })
        .catch(error => {
          this.setState({
            error: `Unexpected error`,
            type: 'error',
            blogs: this.state.blogs.filter(b => b._id !== id)
          })
          setTimeout(() => {
            this.setState({ error: null, type: '' })
          }, 50000)
        })
    }
  }

  deleteBlog = (id) => {
    return () => {

      blogService
        .remove(id)
        .then(updated => {
          this.setState({
            blogs: this.state.blogs.filter(blog => blog._id !== id)
          })
        })
        .catch(error => {
          this.setState({
            error: `Unexpected error`,
            type: 'error',
            blogs: this.state.blogs.filter(b => b._id !== id)
          })
          setTimeout(() => {
            this.setState({ error: null, type: '' })
          }, 50000)
        })
    }
  }

  logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    this.setState({ username: '', password: '', user: null })
  }

  showBlogForm = () => {
    return (
      <Togglable buttonLabel="New Blog">
        <BlogForm addBlog={this.addBlog}
          author={this.state.author}
          title={this.state.title}
          url={this.state.url}
          handleChange={this.handleBlogChange} />
      </Togglable>
    )
  }

  render() {
    const myData = [].concat(this.state.blogs)
      .sort((a, b) => a.likes < b.likes)

    return (
      <div>
        <Notification message={this.state.error} type={this.state.type} />
        {this.state.user === null ?
          <LoginForm username={this.state.username} password={this.state.password}
            handleChange={this.handleLoginFieldChange} login={this.login} />
          :
          <div>
            <h2>Blogs</h2>
            <p>{this.state.user.name} logged in.</p>
            <button onClick={this.logout}>Logout</button>

            {this.showBlogForm()}
            <h3>Blog list</h3>
            {myData.map(blog =>
              <Blog key={blog._id} blog={blog}
                likeHandler={this.handleLike(blog._id)}
                deleteButton={this.deleteBlog(blog._id)}/>)}
          </div>
        }
      </div>
    );
  }
}

export default App;