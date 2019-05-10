import React, { Component } from 'react'
import '../../css/Absence.css'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Radio } from '../../css/testtest'
import { setMakeupLocation } from '../../redux/actions/MakeupActions'

class LocationRadio extends Component {
  constructor(props) {
    super(props)

    props.dispatch(setMakeupLocation('Fairfax'))
    this.state = {
      location: 'Fairfax',
    }
  }

  onChange = (event) => {
    const { dispatch } = this.props

    dispatch(setMakeupLocation(event.target.value))
    this.setState({
      location: event.target.value,
    })
  }

  render() {
    const { location } = this.state

    return (
      <div className='input-group'>
        <span>Location:</span>
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
}

export default connect()(LocationRadio)
