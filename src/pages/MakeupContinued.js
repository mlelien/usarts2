/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import { Row, RowItem } from '../css/testtest'
import TextInput from '../components/TextInput'
import LocationRadio from '../components/LocationRadio'
import { setFirstNameMakeup, setLastNameMakeup, setStudentIDMakeup } from '../redux/actions/MakeupActions'
import ClassDaySelect from '../components/makeup/ClassDaySelect'
import ClassTimeSelect from '../components/ClassTimeSelect'
import RoomSelect from '../components/RoomSelect'
import ShowAbsences from '../components/makeup/ShowAbsences'


const MakeupContinued = (props) => {
  const { makeupLocation, location: { date, time } } = props

  return (
    <section className='container'>
      <div className="title">Schedule a Makeup</div>
      <Row>
        <RowItem>
          <TextInput
            label='Makeup Date'
            value={date}
            disabled
          />
        </RowItem>
        <RowItem>
          <TextInput
            label='Makeup Time'
            value={time}
            disabled
          />
        </RowItem>
      </Row>
      <Row>
        <RowItem>
          <TextInput
            label='First Name'
            value=''
            action={setFirstNameMakeup}
          />
        </RowItem>
        <RowItem>
          <TextInput
            label='Last Name'
            value=''
            action={setLastNameMakeup}
          />
        </RowItem>
        <RowItem>
          <TextInput
            label='Student ID (optional)'
            value=''
            action={setStudentIDMakeup}
          />
        </RowItem>
      </Row>
      <div className="title">Which absence are you making up?</div>
      <Row>
        <RowItem>
          <label className='input-group'>
            <span>Location</span>
            <LocationRadio />
          </label>
        </RowItem>
        <RowItem>
          <ClassDaySelect fromMakeupPage />
        </RowItem>
        <RowItem>
          <ClassTimeSelect />
        </RowItem>
        <RowItem>
          <RoomSelect />
        </RowItem>
      </Row>
      <Row>
        <ShowAbsences makeupDate={date} makeupTime={time} />
      </Row>
    </section>
  )
}

MakeupContinued.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  }).isRequired,
}

const mapStateToProps = state => ({
  makeupLocation: state.makeup.location,
})

export default withRouter(connect(mapStateToProps)(MakeupContinued))
