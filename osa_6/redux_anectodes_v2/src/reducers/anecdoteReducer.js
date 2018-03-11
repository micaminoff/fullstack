import anecdoteService from '../services/anecdotes'

export const vote = (anecdote) => {
  return async (dispatch) => {
    console.log(anecdote)
    const created = { ...anecdote, votes: anecdote.votes + 1 }
    await anecdoteService.vote(created)
    dispatch({
      type: 'VOTE',
      id: created.id
    })
  }
}
export const create = (content) => {
  return async (dispatch) => {
    const created = await anecdoteService.saveAnecdote(content)
    console.log(content)
    console.log(created)
    dispatch({
      type: 'CREATE',
      data: created
    })
  }
}
export const init = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAnecdotes()
    console.log(anecdotes)
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

const anReducer = (state = [], action) => {
  if (action.type === 'VOTE') {
    const old = state.filter(a => a.id !== action.id)
    const voted = state.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes + 1 }]
  }
  if (action.type === 'CREATE') {
    return [...state, action.data]
  }
  if (action.type === 'INIT') {
    console.log(action)
    return action.data
  }

  return state
}

export default anReducer