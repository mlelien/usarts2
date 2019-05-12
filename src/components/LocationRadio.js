import React, { Component } from 'react'
import '../css/Absence.css'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Radio } from '../css/testtest'
import { setLocation } from '../redux/actions/AbsenceActions'

class LocationRadio extends Component {
  onChange = (event) => {
    const { dispatch, childIndex } = this.props

    dispatch(setLocation(event.target.value, childIndex))
  }

  render() {
    const { location } = this.props

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
  location: PropTypes.string.isRequired,
}

const mapStateToProps = (state, props) => ({
  location: state.absenceChildren[props.childIndex].location,
})

export default connect(mapStateToProps)(LocationRadio)
