import { createStore, combineReducers } from 'redux'
import anReducer from './reducers/anecdoteReducer'
import notReducer from './reducers/notificationReducer'

const reducer = combineReducers({ anecdotes: anReducer, notification: notReducer })
const store = createStore(reducer)

console.log(store.getState())

export default store