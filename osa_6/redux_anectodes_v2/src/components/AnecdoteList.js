import React from 'react'
import { actionCreator } from '../reducers/anecdoteReducer'
import { notActionCreator } from '../reducers/notificationReducer'
import PropTypes from 'prop-types'

class AnecdoteList extends React.Component {
  handleVote = (anecdote) => {
    return () => {
      this.context.store.dispatch(actionCreator.vote(anecdote.id))
      this.context.store.dispatch(notActionCreator.succeed('voted for ' + anecdote.content))
      setTimeout(() => {
        this.context.store.dispatch(notActionCreator.reset())
      }, 5000)
    }
  }

  render() {
    const anecdotes = this.context.store.getState().anecdotes
    const filter = this.context.store.getState().filter
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

AnecdoteList.contextTypes = {
  store: PropTypes.object
}

export default AnecdoteList
