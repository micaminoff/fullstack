import React from 'react'
import Person from './components/Person'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNum: '',
      filter: ''
    }
  }
  nameChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }
  numChange = (event) => {
    console.log(event.target.value)
    this.setState({ newNum: event.target.value })
  }
  addPers = (event) => {
    event.preventDefault()
    const found = this.state.persons.filter(person => person.name === this.state.newName)
    if (found.length > 0) {
      console.log("Name already exists in list")
      return
    }
    const persObject = {
      name: this.state.newName,
      number: this.state.newNum
    }
    const persons = this.state.persons.concat(persObject)

    this.setState({
      persons,
      newName: '',
      newNum: ''
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
        Filter by name: <input onChange={this.activateFilter}/>
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
          {persons.map(pers => <Person key={pers.name} person={pers}/>)}
        </ul>
      </div>
    )
  }
}

export default App