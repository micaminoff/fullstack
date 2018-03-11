import axios from 'axios'

const getAnecdotes = async () => {
  const response = await axios.get('http://localhost:3001/anecdotes')
  return response.data
}

const saveAnecdote = async (content) => {
  const anecdote = { content: content, votes: 0 }
  const response = await axios.post('http://localhost:3001/anecdotes', anecdote)
  return response.data
}

export default { getAnecdotes, saveAnecdote }