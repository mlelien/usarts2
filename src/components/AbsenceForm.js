/* eslint-disable no-tabs */
import React from 'react'
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
import { Row, RowItem } from '../css/testtest'
import '../css/Absence.css'
import '../css/styles.css'
import { childPropType } from '../helpers/propTypes'

const AbsenceForm = (props) => {
  const { childIndex, child } = props
  const {
    lastName, firstName, studentID, room, classTime,
    schoolPickup,
  } = child

  return (
    <form>
      <Row>
        <label className='input-group'>
          <span>Location</span>
          <LocationRadio childIndex={childIndex} />
        </label>
      </Row>
      <Row>
        <RowItem>
          <label className='input-group'>
            <span>Absence Date</span>
            <EnterDate childIndex={childIndex} />
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
  child: childPropType.isRequired,
  childIndex: PropTypes.number.isRequired,
}

const mapStateToProps = (state, props) => ({
  child: state.absenceChildren[props.childIndex],
})

export default withRouter(connect(mapStateToProps)(AbsenceForm))
