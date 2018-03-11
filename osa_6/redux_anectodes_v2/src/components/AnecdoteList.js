import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  handleVote = (anecdote) => {
    return async () => {
      await this.props.vote(anecdote)
      this.props.notify('You voted for ' + anecdote.content, 10)
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

const ConnectedAnecdoteList = connect(mapStateToProps, { vote, notify }) (AnecdoteList)

export default ConnectedAnecdoteList
