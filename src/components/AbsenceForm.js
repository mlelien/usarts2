import React from 'react'
import '../css/Absence.css'
import '../css/styles.css'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
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
          <span>Location</span>
          <LocationRadio childIndex={childIndex} value={location} />
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

const mapDispatchToProps = (state, props) => ({
  child: state[props.childIndex],
})

// const mapDispatchToProps = state => ({
//   date: state.date,
//   location: state.localizer,
//   lastName: state.lastName,
//   firstName: state.firstName,
//   studentID: state.studentID,
//   room: state.room,
//   classTime: state.classTime,
//   schoolPickup: state.schoolPickup,
// })

export default withRouter(connect(mapDispatchToProps)(AbsenceForm))
