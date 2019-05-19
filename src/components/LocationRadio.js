import React, { Component } from 'react'
import '../css/Absence.css'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Radio } from '../css/testtest'
import { setLocation } from '../redux/actions/AbsenceActions'
import { setLookupAbsenceLocation } from '../redux/actions/MakeupActions'

class LocationRadio extends Component {
  onChange = (event) => {
    const { dispatch, childIndex } = this.props

    if (childIndex > -1) { dispatch(setLocation(event.target.value, childIndex)) } else { dispatch(setLookupAbsenceLocation(event.target.value)) }
  }

  render() {
    const { location } = this.props
    console.log(location)
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

LocationRadio.defaultProps = {
  childIndex: -1,
}

LocationRadio.propTypes = {
  dispatch: PropTypes.func.isRequired,
  childIndex: PropTypes.number,
  location: PropTypes.string.isRequired,
}

const mapStateToProps = (state, props) => {
  const location = props.childIndex > -1
    ? state.absenceChildren[props.childIndex].location
    : state.makeup.lookupAbsenceLocation

  return {
    location,
  }
}

export default connect(mapStateToProps)(LocationRadio)
