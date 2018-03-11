export const notify = (message, timeout) => {
  return (dispatch) => {
    console.log(message)
    console.log(timeout)
    dispatch({
      type: 'NOTIFY',
      message: message,
    })

    setTimeout(() => {
      dispatch({
        type: 'NOTIFY',
        message: ''
      })
    }, timeout*1000)
  }
}

const notReducer = (state = '', action) => {
  if (action.type === 'NOTIFY') {
    return action.message
  }
  return state
}

export default notReducer