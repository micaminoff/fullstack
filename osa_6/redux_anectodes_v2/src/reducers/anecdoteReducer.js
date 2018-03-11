const getId = () => (100000 * Math.random()).toFixed(0)

export const actionCreator = {
  vote(id) {
    return {
      type: 'VOTE',
      id: id
    }
  },
  create(content) {
    return {
      type: 'CREATE',
      data: {
        content: content,
        id: getId(),
        votes: 0
      }
    }
  },
  init(anecdotes) {
    console.log(anecdotes)
    return {
      type: 'INIT',
      data: anecdotes
    }
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