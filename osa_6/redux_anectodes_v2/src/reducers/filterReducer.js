export const filActionCreator = {
  filter(string) {
    return {
      type: 'FILTER',
      string: string
    }
  }
}

const filReducer = (state = '', action) => {
  if (action.type === 'FILTER') {
    return action.string
  }
  return state
}

export default filReducer