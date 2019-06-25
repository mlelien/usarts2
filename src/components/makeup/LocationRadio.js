import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
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
      <div className='form-group'>
        <label className='text-primary' htmlFor=""><b>Location</b></label>
        <div className='form-check'>
          <input
            type="radio"
            className="form-check-input"
            name='locationRadios'
            id='FairfaxMakeup'
            value='Fairfax'
            checked={location === 'Fairfax'}
            onChange={this.onChange}
          />
          <label htmlFor="FairfaxMakeup" className="form-check-label">
            Fairfax
          </label>
        </div>
        <div className='form-check'>
          <input
            type="radio"
            className="form-check-input"
            name='locationRadios'
            id='ChantillyMakeup'
            value='Chantilly'
            checked={location === 'Chantilly'}
            onChange={this.onChange}
          />
          <label htmlFor="ChantillyMakeup" className="form-check-label">
            Chantilly
          </label>
        </div>
      </div>
    )
  }
}

LocationRadio.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect()(LocationRadio)
