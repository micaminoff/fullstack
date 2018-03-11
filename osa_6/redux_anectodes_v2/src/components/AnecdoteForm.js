import React from 'react'
import { connect } from 'react-redux'
import { actionCreator } from '../reducers/anecdoteReducer'
import { notActionCreator } from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.create(content)
    this.props.succeed('created new anecdote!')
    setTimeout(() => {
      this.props.reset()
    }, 5000)
    e.target.anecdote.value = ''
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote' /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { state }
}

const mapDispatchToProps = (dispatch) => {
  return {
    create: (content) => {
      dispatch(actionCreator.create(content))
    },
    succeed: (message) => {
      dispatch(notActionCreator.succeed(message))
    },
    reset: () => { dispatch(notActionCreator.reset()) }
  }
}

const ConnectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm