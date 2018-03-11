import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import { init } from './reducers/anecdoteReducer'
import connect from 'react-redux/lib/connect/connect'

class App extends React.Component {
  componentDidMount = async () => {
    console.log(this.props.init)
    this.props.init()
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

const connectedApp = connect(null, { init })(App)

export default connectedApp