import React, { Component } from 'react'
import '../css/Absence.css'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setLocation } from '../redux/actions/AbsenceActions'

const Radio = styled.input`
  margin-right: 2rem;
  margin-bottom: 1rem;
`

class LocationRadio extends Component {
  constructor(props) {
    super(props)

    this.state = {
      location: props.value,
    }
  }

  onChange = (event) => {
    const { dispatch, childIndex } = this.props

    dispatch(setLocation(event.target.value, childIndex))
    this.setState({
      location: event.target.value,
    })
  }

  render() {
    const { location } = this.state

    return (
      <div className='input-group'>
        <label>
          <Radio
            type='radio'
            value='Fairfax'
            checked={location === 'Fairfax'}
            onChange={this.onChange}
          />
          <span>Fairfax</span>
        </label>
        <label>
          <Radio
            type='radio'
            value='Chantilly'
            checked={location === 'Chantilly'}
            onChange={this.onChange}
          />
          <span>Chantilly</span>
        </label>
      </div>
    )
  }
}

LocationRadio.propTypes = {
  dispatch: PropTypes.func.isRequired,
  childIndex: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
}

export default connect()(LocationRadio)
