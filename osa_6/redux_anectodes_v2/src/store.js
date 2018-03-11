import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import anReducer from './reducers/anecdoteReducer'
import notReducer from './reducers/notificationReducer'
import filReducer from './reducers/filterReducer'


const reducer = combineReducers({ anecdotes: anReducer, notification: notReducer, filter: filReducer })
const store = createStore(reducer, applyMiddleware(thunk))

console.log(store.getState())

export default store