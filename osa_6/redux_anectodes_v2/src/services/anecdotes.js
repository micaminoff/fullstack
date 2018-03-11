import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAnecdotes = async () => {
  const response = await axios.get(url)
  return response.data
}

const saveAnecdote = async (content) => {
  const anecdote = { content: content, votes: 0 }
  const response = await axios.post(url, anecdote)
  return response.data
}

const vote = async (anecdote) => {
  const response = await axios.put(url, anecdote)
  return response.data
}

export default { getAnecdotes, saveAnecdote, vote }