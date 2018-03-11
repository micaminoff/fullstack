import React from 'react'
import { connect } from 'react-redux'
import { actionCreator } from '../reducers/anecdoteReducer'
import { notActionCreator } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

class AnecdoteForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    const created = await anecdoteService.saveAnecdote(content)
    console.log(created)
    this.props.create(created)
    this.props.succeed('created new anecdote!')
    setTimeout(() => {
      this.props.reset()
    }, 5000)
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