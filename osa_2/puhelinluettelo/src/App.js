import React from 'react'
import Person from './components/Person'
import personService from './services/persons'
import Notification from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNum: '',
      change: null,
      filter: ''
    }
  }

  componentDidMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({ persons: response.data })
      })
  }
  nameChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }
  numChange = (event) => {
    console.log(event.target.value)
    this.setState({ newNum: event.target.value })
  }
  setMessage = (string) => {
    this.setState({change: string})
    setTimeout (() => {this.setState({change: null})}, 5000)

  }
  remove = (id) => {
    return () => {
      if (window.confirm("Are you sure?")) {
        personService.remove(id)
          .then(response => {
            this.setState({
              persons: this.state.persons.filter(person => person._id !== id)
            })
          })
          this.setMessage("Person successfully removed!")
      }
    }
  }
  addPers = (event) => {
    event.preventDefault()
    const chPerson = this.state.persons.find(person => person.name === this.state.newName)
    if (chPerson) {
      console.log("Name already exists in list")
      if (window.confirm(chPerson.name + " already exists. Assign new number?")) {
        const changedPers = {...chPerson, number: this.state.newNum}
        personService.update(changedPers._id, changedPers)
          .then(response => {
            const persons = this.state.persons.filter(person => person.name !== this.state.newName)
            this.setState({
              persons: persons.concat(changedPers),
              newName: '',
              newNum: ''
            })
            this.setMessage(changedPers.name + "'s number successfully changed!")
          })
      }
      return
    }
    const persObject = {
      name: this.state.newName,
      number: this.state.newNum
    }
    personService
      .create(persObject)
      .then(response => {
        this.setState({
          persons: this.state.persons.concat(response.data),
          newName: '',
          newNum: ''
        })
        this.setMessage('New entry created!')
      })
  }
  activateFilter = (event) => {
    event.preventDefault()
    this.setState({ filter: event.target.value })
  }

  render() {
    const persons = this.state.persons.filter(person => person.name.search(new RegExp(this.state.filter, 'i')) !== -1)
    return (
      <div>
        Filter by name: <input onChange={this.activateFilter} />
        <Notification message={this.state.change} />
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addPers}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.nameChange} />
            numero: <input value={this.state.newNum} onChange={this.numChange} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <ul>
          {persons.map(pers =>
            <div key={pers.name}>
              <Person person={pers} />
              <button onClick={this.remove(pers._id)}>Remove</button>
            </div>)}
        </ul>
      </div>
    )
  }
}

export default App