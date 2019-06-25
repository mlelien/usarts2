import React, { Component } from 'react'
import { connect } from 'react-redux'
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

    if (childIndex === -1) { dispatch(action(value)) } else dispatch(action(value, childIndex))

    this.setState({
      value,
    })
  }

  render() {
    const { label, disabled, id } = this.props
    const { value } = this.state

    return (
      <input
        type="text"
        className='form-control'
        id={id}
        value={value}
        onChange={this.onChange}
        disabled={disabled}
      />
    )
  }
}

TextInput.defaultProps = {
  value: '',
  disabled: false,
  childIndex: -1,
  action: () => {},
}

TextInput.propTypes = {
  dispatch: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  action: PropTypes.func,
  value: PropTypes.string,
  childIndex: PropTypes.number,
  disabled: PropTypes.bool,
}

export default connect()(TextInput)
