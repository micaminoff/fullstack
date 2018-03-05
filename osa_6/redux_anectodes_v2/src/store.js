import { createStore, combineReducers } from 'redux'
import anReducer from './reducers/anecdoteReducer'
import notReducer from './reducers/notificationReducer'
import filReducer from './reducers/filterReducer'

const reducer = combineReducers({ anecdotes: anReducer, notification: notReducer, filter: filReducer })
const store = createStore(reducer)

console.log(store.getState())

export default store