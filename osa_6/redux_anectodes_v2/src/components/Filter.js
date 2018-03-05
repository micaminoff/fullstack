import React from 'react'
import PropTypes from 'prop-types'
import { filActionCreator } from '../reducers/filterReducer'

class Filter extends React.Component {
  handleChange = (event) => {
    this.context.store.dispatch(filActionCreator.filter(event.target.value))
  }
  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={this.handleChange}/>
      </div>
    )
  }
}

Filter.contextTypes = {
  store: PropTypes.object
}

export default Filter