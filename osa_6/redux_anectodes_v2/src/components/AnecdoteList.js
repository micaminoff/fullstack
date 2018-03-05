import React from 'react'
import { actionCreator } from '../reducers/anecdoteReducer'
import { notActionCreator } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  render() {
    const anecdotes = this.props.store.getState().anecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {
                this.props.store.dispatch(actionCreator.vote(anecdote.id))
                this.props.store.dispatch(notActionCreator.succeed('voted for ' + anecdote.content))
                setTimeout(() => {
                  this.props.store.dispatch(notActionCreator.reset())
                }, 5000)
              }}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList
