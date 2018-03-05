export const actionCreator = {
  fail() {
    return {
      type: 'ERROR',
      message: 'You fucked up!'
    }
  },
  succeed() {
    return {
      type: 'SUCCESS',
      message: 'Well done!'
    }
  }
}

const notReducer = (state = 'default message', action) => {
  if (action.type === 'ERROR') {
    return { ...state, message: action.message }
  }
  if (action.type === 'SUCCESS') {
    return { ...state, message: action.message }
  }
  return state
}

export default notReducer