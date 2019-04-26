import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/Absence.css'
import PropTypes from 'prop-types'

class TextInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value,
    }
  }

  onChange = (event) => {
    const { dispatch, action, childIndex } = this.props
    const { value } = event.target

    dispatch(action(value, childIndex))
    this.setState({
      value,
    })
  }

  render() {
    const { label } = this.props
    const { value } = this.state

    return (
      <label className='input-group'>
        <span>{label}</span>
        <input
          className='input'
          type='text'
          value={value}
          onChange={this.onChange}
        />
      </label>
    )
  }
}

TextInput.defaultProps = {
  value: '',
}

TextInput.propTypes = {
  dispatch: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  value: PropTypes.string,
  childIndex: PropTypes.number.isRequired,
}

export default connect()(TextInput)
