import React from 'react'
import { connect } from 'react-redux'
import { actionCreator } from '../reducers/anecdoteReducer'
import { notActionCreator } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  handleVote = (anecdote) => {
    return () => {
      this.props.vote(anecdote.id)
      this.props.succeed('voted for ' + anecdote.content)
      setTimeout(() => {
        this.props.reset()
      }, 5000)
    }
  }

  render() {
    const anecdotes = this.props.anecdotes
    const filter = this.props.filter
    const filtered = anecdotes.filter(a => (a.content.toLowerCase()).includes(filter.toLowerCase()))
    return (
      <div>
        <h2>Anecdotes</h2>
        {filtered.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.handleVote(anecdote)}> vote </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { anecdotes: state.anecdotes, filter: state.filter }
}
const mapDispatchToProps = (dispatch) => {
  return {
    vote: (id) => {
      dispatch(actionCreator.vote(id))
    },
    succeed: (message) => {
      dispatch(notActionCreator.succeed(message))
    },
    reset: () => { dispatch(notActionCreator.reset()) }
  }
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList
