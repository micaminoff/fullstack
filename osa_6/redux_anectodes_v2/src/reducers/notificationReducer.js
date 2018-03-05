export const notActionCreator = {
  fail() {
    return {
      type: 'ERROR',
      notification: 'You fucked up!'
    }
  },
  succeed(message) {
    return {
      type: 'SUCCESS',
      notification: message
    }
  },
  reset() {
    return {
      type: 'ZERO',
      notification: ''
    }
  }
}

const notReducer = (state = 'default message', action) => {
  if (action.type === 'ERROR') {
    return action.notification
  }
  if (action.type === 'SUCCESS') {
    return action.notification
  }
  if (action.type === 'ZERO') {
    return action.notification
  }
  return state
}

export default notReducer