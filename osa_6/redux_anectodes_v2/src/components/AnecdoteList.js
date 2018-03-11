import React from 'react'
import { connect } from 'react-redux'
import { actionCreator } from '../reducers/anecdoteReducer'
import { notActionCreator } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

class AnecdoteList extends React.Component {
  handleVote = (anecdote) => {
    return async () => {
      this.props.vote(anecdote.id)
      anecdote = { ...anecdote, votes: anecdote.votes + 1 }
      await anecdoteService.vote(anecdote)
      this.props.succeed('voted for ' + anecdote.content)
      setTimeout(() => {
        this.props.reset()
      }, 5000)
    }
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
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
  // Muahahahaha. Paras ratkaisu ikinä.
  return { anecdotes: state.anecdotes.filter(a => (a.content.toLowerCase()).includes(state.filter.toLowerCase())) }
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
