/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextInput from '../components/TextInput'
import LocationRadio from '../components/LocationRadio'
import { setFirstNameMakeup, setLastNameMakeup, setStudentIDMakeup } from '../redux/actions/MakeupActions'
import ClassDaySelect from '../components/makeup/ClassDaySelect'
import ClassTimeSelect from '../components/ClassTimeSelect'
import RoomSelect from '../components/RoomSelect'
import ShowAbsences from '../components/makeup/ShowAbsences'


const MakeupContinued = (props) => {
  const { makeupLocation, location: { date, time } } = props
console.log('makeupLocaiton in MakeupContinued: ' + makeupLocation);
  return (
    <div className='container'>
      <h3 className='mb-3'>Schedule a Makeup</h3>
      <form>
        <div className='form-row'>
          <div className='col-md-3'>
            <div className="form-group">
              <label htmlFor="makeupDate">Makeup Date</label>
              <TextInput
                id='makeupDate'
                label='Makeup Date'
                value={date}
                disabled
              />
            </div>
          </div>
          <div className='col-md-3'>
            <div className="form-group">
              <label htmlFor="makeupTime">Makeup Time</label>
              <TextInput
                id='makeupTime'
                label='Makeup Time'
                value={time}
                disabled
              />
            </div>
          </div>
        </div>
        <div className='form-row'>
          <div className='col-md-3'>
            <label htmlFor="firstName">First Name</label>
            <TextInput
              id='firstName'
              label='First Name'
              value=''
              action={setFirstNameMakeup}
            />
          </div>
          <div className='col-md-3'>
            <label htmlFor="lastName">Last Name</label>
            <TextInput
              label='Last Name'
              value=''
              action={setLastNameMakeup}
            />
          </div>
          <div className='col-md-3'>
            <label htmlFor="studentID">Student ID</label>
            <TextInput
              label='Student ID (optional)'
              value=''
              action={setStudentIDMakeup}
            />
          </div>
        </div>
        <h5 className='mt-5 mb-3'>Which absence are you making up?</h5>
        <div>
          <div className="row">
            <div className='form-group col-md-3'>
              <label>Location</label>
              <LocationRadio />
            </div>
            <div className='form-group col-md-3'>
              <label htmlFor="classDay">Original Class Day</label>
              <ClassDaySelect fromMakeupPage />
            </div>
            <div className='form-group col-md-3'>
              <label htmlFor="classTime">Class Time</label>
              <ClassTimeSelect />
            </div>
            <div className='form-group col-md-3'>
              <label htmlFor="roomSelect">Room #</label>
              <RoomSelect />
            </div>
          </div>
        </div>
        <div>
          <ShowAbsences makeupDate={date} makeupTime={time} makeupLocation={makeupLocation} />
        </div>
      </form>
    </div>
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
