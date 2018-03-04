import React from 'react'
const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }
  return type === 'error'
    ?
    (<div className="error">
      {message}
    </div>)
    :
    (<div className="success">
      {message}
    </div>)
}

export default Notification