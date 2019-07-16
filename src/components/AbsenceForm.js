/* eslint-disable no-tabs */
import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import EnterDate from './EnterDate'
import LocationRadio from './LocationRadio'
import TextInput from './TextInput'
import { setFirstName, setLastName, setStudentID } from '../redux/actions/AbsenceActions'
import RoomSelect from './RoomSelect'
import ClassTimeSelect from './ClassTimeSelect'
import SchoolPickupSelect from './SchoolPickupSelect'
import { childPropType } from '../helpers/propTypes'
import { getStudentFromList } from '../helpers/makeupHelpers'

const AbsenceForm = (props) => {
  const [studentID, setStudentIDState] = useState('')

  const {
    childIndex, child, fairfaxStudents, chantillyStudents, dispatch,
  } = props
  const {
    lastName, firstName, room, classTime, schoolPickup,
  } = child

  const onGetID = () => {
    const studentList = child.location === 'Fairfax' ? fairfaxStudents : chantillyStudents
    const student = getStudentFromList(studentList, room, classTime, firstName, lastName)

    if (student) setStudentIDState(student.ID)
    else setStudentIDState('Cannot find student')

    dispatch(setStudentID(student.ID, childIndex))
  }


  return (
    <form>
      <div className='form-group'>
        <label>Location</label>
        <LocationRadio childIndex={childIndex} />
      </div>
      <div className='form-group'>
        <label htmlFor='date'>Absence Date</label>
        <br />
        <EnterDate childIndex={childIndex} />
      </div>
      <div className='form-row'>
        <div className='form-group col-md-3'>
          <label htmlFor="firstName">First Name</label>
          <TextInput
            label='First Name'
            id='firstName'
            action={setFirstName}
            childIndex={childIndex}
            value={firstName}
          />
        </div>
        <div className='form-group col-md-3'>
          <label htmlFor="lastName">Last Name</label>
          <TextInput
            label='Last Name'
            id='lastName'
            action={setLastName}
            childIndex={childIndex}
            value={lastName}
          />
        </div>
      </div>
      <div className='form-row'>
        <div className='form-group col-md-3'>
          <label htmlFor="room">Room #</label>
          <RoomSelect childIndex={childIndex} value={room} />
        </div>
        <div className='form-group col-md-3'>
          <label htmlFor="classTime">Class Time</label>
          <ClassTimeSelect childIndex={childIndex} value={classTime} />
        </div>
      </div>
      <div className="form-row my-4">
        <div className='form-group col-md-3'>
          <label htmlFor="studentID">Student ID</label>
          <input
            type="text"
            className='form-control'
            id='studentID'
            value={studentID}
            disabled
          />
        </div>
        <div className="form-group col-md-3">
          <p className='small get-id-text'>Fill out all previous fields to get ID</p>
          <button type='button' className="btn-primary" onClick={onGetID}>Get ID</button>
        </div>
      </div>
      <div className="form-row">
        <div className='form-group col-md-3'>
          <label className='mb-0' htmlFor="schoolpickup">School pickup (optional)</label>
          <small className='form-text text-muted mb-1'>If your child usually gets picked up from school, please select the school here:</small>
          <SchoolPickupSelect childIndex={childIndex} value={schoolPickup} />
        </div>
      </div>
    </form>
  )
}

AbsenceForm.propTypes = {
  child: childPropType.isRequired,
  childIndex: PropTypes.number.isRequired,
}

const mapStateToProps = (state, props) => ({
  child: state.absenceChildren[props.childIndex],
  fairfaxStudents: state.fairfaxStudents,
  chantillyStudents: state.chantillyStudents,
})

export default withRouter(connect(mapStateToProps)(AbsenceForm))
