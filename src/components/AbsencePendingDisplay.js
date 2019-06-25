import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const AbsencePendingDisplay = (props) => {
  const {
    date, location, lastName, firstName, studentID, room, classTime,
    schoolPickup, repeatedAbsences,
  } = props

  return (
    <div>
      <div className='row'>
        <p className='col-md-3'>Absence Date</p>
        <p className='col-md-3 font-weight-bold'>{date.format('dddd, MMM DD')}</p>
      </div>
      <div className='row'>
        <p className='col-md-3'>Location</p>
        <p className='col-md-3 font-weight-bold'>{location}</p>
      </div>
      <div className='row'>
        <p className='col-md-3'>First Name</p>
        <p className='col-md-3 font-weight-bold'>{firstName}</p>
        <p className='col-md-3'>Class Time</p>
        <p className='col-md-3 font-weight-bold'>{classTime}</p>
      </div>
      <div className='row'>
        <p className='col-md-3'>Last Name</p>
        <p className='col-md-3 font-weight-bold'>{lastName}</p>
        <p className='col-md-3'>Room #</p>
        <p className='col-md-3 font-weight-bold'>{room}</p>
      </div>
      <div className='row'>
        <p className='col-md-3'>Student ID (optional)</p>
        <p className='col-md-3 font-weight-bold'>{studentID}</p>
        <p className='col-md-3'>School pickup (optional)</p>
        <p className='col-md-3 font-weight-bold'>{schoolPickup}</p>
      </div>
      <div className='row'>
        <p className='col-md-3'>Repeated Absence (optional)</p>
        <p className='col-md-3 font-weight-bold'>{repeatedAbsences}</p>
      </div>
    </div>
  )
}

AbsencePendingDisplay.defaultProps = {
  studentID: '',
  schoolPickup: '',
  repeatedAbsences: '',
}

AbsencePendingDisplay.propTypes = {
  date: PropTypes.instanceOf(moment).isRequired,
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
