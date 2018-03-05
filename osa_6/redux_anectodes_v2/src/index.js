import React from 'react' // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom'
import App from './App' // eslint-disable-line no-unused-vars
import { Provider } from 'react-redux'
import store from './store'


const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)