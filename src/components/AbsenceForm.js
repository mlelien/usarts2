import React from 'react'
import '../css/Absence.css'
import '../css/styles.css'
import styled from 'styled-components'
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

const Row = styled.div`
	display: flex; 
  margin-bottom: 3rem;
`

const RowItem = styled.div`
	margin-right: 8rem;
`

const AbsenceForm = (props) => {
  const { childIndex, child } = props
  const {
    date, location, lastName, firstName, studentID, room, classTime,
    schoolPickup,
  } = child

  return (
    <form>
      <Row>
        <RowItem>
          <label className='input-group'>
            <span>Absence Date</span>
            <EnterDate childIndex={childIndex} value={date} />
          </label>
        </RowItem>
        <RowItem>
          <label className='input-group'>
            <span>Location</span>
            <LocationRadio childIndex={childIndex} value={location} />
          </label>
        </RowItem>
      </Row>
      <Row>
        <RowItem>
          <TextInput
            label='First Name'
            action={setFirstName}
            childIndex={childIndex}
            value={firstName}
          />
        </RowItem>
        <RowItem>
          <TextInput
            label='Last Name'
            action={setLastName}
            childIndex={childIndex}
            value={lastName}
          />
        </RowItem>
        <RowItem>
          <TextInput
            label='Student ID (optional)'
            action={setStudentID}
            childIndex={childIndex}
            value={studentID}
          />
        </RowItem>
      </Row>
      <Row>
        <RowItem>
          <RoomSelect childIndex={childIndex} value={room} />
        </RowItem>
        <RowItem>
          <ClassTimeSelect childIndex={childIndex} value={classTime} />
        </RowItem>
        <RowItem>
          <SchoolPickupSelect childIndex={childIndex} value={schoolPickup} />
        </RowItem>
      </Row>
    </form>
  )
}

AbsenceForm.propTypes = {
  child: PropTypes.shape({
    date: PropTypes.object.isRequired,
    location: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    studentID: PropTypes.string,
    room: PropTypes.string.isRequired,
    classTime: PropTypes.string.isRequired,
    schoolPickup: PropTypes.string,
    repeatedAbsences: PropTypes.string,
  }).isRequired,
  childIndex: PropTypes.number.isRequired,
}

const mapDispatchToProps = (state, props) => ({
  child: state.absenceChildren[props.childIndex],
})

export default withRouter(connect(mapDispatchToProps)(AbsenceForm))
