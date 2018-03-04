import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const Statistiikka = () => {

  const stateNow = store.getState()
  const palautteita = Object.values(stateNow).reduce((a, b) => a + b)

  if (palautteita === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu vielä</div>
      </div>
    )
  }

  // good = 1, ok = 0, bad = -1
  const average = () => ((stateNow.good - stateNow.bad) / palautteita)

  const positiivisia = () => (stateNow.good / palautteita) * 100 + "%"

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{stateNow.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{stateNow.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{stateNow.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{average()}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{positiivisia()}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={() => store.dispatch({type: 'ZERO'})}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  klik = (nappi) => () => {
    store.dispatch({type: nappi})
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

render()
store.subscribe(render)