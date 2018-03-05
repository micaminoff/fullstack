import React from 'react' // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom'
import App from './App' // eslint-disable-line no-unused-vars
import store from './store'


const render = () => {
  ReactDOM.render(
    <App store={store} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)