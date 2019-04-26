import React, { Component } from 'react'
import '../css/styles.css'
import '../css/AbsencePending.css'
import PropTypes from 'prop-types'

class AbsencePendingDisplay extends Component {
  render() {
    const {
      date, location, lastName, firstName, studentID, room, classTime,
      schoolPickup, repeatedAbsences,
    } = this.props

    return (
      <div>
        <div className='row-1'>
          <p className='prompt'>Absence Date</p>
          <p className='answer'>{date.format('dddd, MMM DD')}</p>
        </div>
        <div className='row-1'>
          <p className='prompt'>Location</p>
          <p className='answer'>{location}</p>
        </div>
        <div className='row-2'>
          <p className='prompt'>First Name</p>
          <p className='answer'>{firstName}</p>
          <p className='prompt'>Class Time</p>
          <p className='answer'>{classTime}</p>
        </div>
        <div className='row-2'>
          <p className='prompt'>Last Name</p>
          <p className='answer'>{lastName}</p>
          <p className='prompt'>Room #</p>
          <p className='answer'>{room}</p>
        </div>
        <div className='row-2'>
          <p className='prompt'>Student ID (optional)</p>
          <p className='answer'>{studentID}</p>
          <p className='prompt'>School pickup (optional)</p>
          <p className='answer'>{schoolPickup}</p>
        </div>
        <div className='row-1'>
          <p className='prompt'>Repeated Absence (optional)</p>
          <p className='answer'>{repeatedAbsences}</p>
        </div>
      </div>
    )
  }
}

AbsencePendingDisplay.defaultProps = {
  studentID: '',
  schoolPickup: '',
}

AbsencePendingDisplay.propTypes = {
  date: PropTypes.object.isRequired,
  location: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  studentID: PropTypes.string,
  room: PropTypes.string.isRequired,
  classTime: PropTypes.string.isRequired,
  schoolPickup: PropTypes.string,
  repeatedAbsences: PropTypes.string,
}

export default AbsencePendingDisplay
