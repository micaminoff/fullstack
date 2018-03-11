import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import { actionCreator } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'
import connect from 'react-redux/lib/connect/connect'

class App extends React.Component {
  componentDidMount = async () => {
    const anecdotes = await anecdoteService.getAnecdotes()
    console.log(anecdotes)
    this.props.init(anecdotes)
  }

  render() {
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Notification />
        <Filter />
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    init: (anecdotes) => { dispatch(actionCreator.init(anecdotes)) }
  }
}

const connectedApp = connect(null, mapDispatchToProps)(App)

export default connectedApp