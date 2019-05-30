import React, { Component } from 'react'
import '../css/Absence.css'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Radio } from '../css/testtest'
import { setLocation } from '../redux/actions/AbsenceActions'
import { setLookupAbsenceLocation } from '../redux/actions/MakeupActions'
import { weekDayToNumber } from '../helpers/timeHelpers'
import { classScheduleModifiedPropTypes } from '../helpers/propTypes'

class LocationRadio extends Component {
  roomCheck = (classSchedule, weekDayNum) => {
    const { room } = this.props

    if (weekDayNum) {
      const classObjArr = classSchedule[weekDayNum]
      const result = classObjArr.filter(classObj => classObj.roomNumber === room)

      return result.length > 0
    }

    let goodToGo = false
    for (let i = 0; i < 7; i++) {
      goodToGo = goodToGo || classSchedule[i].filter(classObj => classObj.roomNumber === room).length > 0
    }
    return goodToGo
  }

  timeCheck = (classSchedule, weekDayNum) => {
    const { time } = this.props

    if (weekDayNum) {
      const classObjArr = classSchedule[weekDayNum]
      const result = classObjArr.filter(classObj => classObj.time === time)
      return result.length > 0
    }

    let goodToGo = false
    for (let i = 0; i < 7; i++) {
      goodToGo = goodToGo || classSchedule[i].filter(classObj => classObj.time === time).length > 0
    }
    return goodToGo
  }

  checkTimeAndRoom = (classSchedule, weekDayNum) => {
    const { room, time } = this.props

    if (weekDayNum) {
      const classObjArr = classSchedule[weekDayNum]
      const result = classObjArr.filter(classObj => classObj.time === time && classObj.roomNumber === room)
      return result.length > 0
    }

    let goodToGo = false
    for (let i = 0; i < 7; i++) {
      goodToGo = goodToGo || classSchedule[i].filter(classObj => classObj.time === time && classObj.roomNumber === room)
    }
    return goodToGo
  }

  onChange = (event) => {
    const {
      dispatch, childIndex, day, time, room, fairfaxClassSchedule, chantillyClassSchedule,
    } = this.props
    const { value } = event.target

    if (childIndex > -1) {
      dispatch(setLocation(value, childIndex))
    } else {
      let goodToGo
      const weekDayNum = weekDayToNumber(day)
      const classSchedule = value === 'Fairfax' ? fairfaxClassSchedule : chantillyClassSchedule

      // no day, no time, no room
      if (!day && !time && !room) goodToGo = true

      // no day, yes time, yes room
      else if (!day && time && room) goodToGo = this.checkTimeAndRoom(classSchedule, weekDayNum)

      // no day, yes time, no room
      else if (!day && time && !room) goodToGo = this.timeCheck(classSchedule, weekDayNum)

      // no day, no time, yes room
      else if (!day && !time && room) goodToGo = this.roomCheck(classSchedule, weekDayNum)

      // yes day, no time, no room
      else if (day && !time && !room) goodToGo = classSchedule[weekDayNum].length > 0

      // yes day, yes time, no room
      else if (day && time && !room) goodToGo = this.timeCheck(classSchedule, weekDayNum)

      // yes day, no time, yes room
      else if (day && !time && room) goodToGo = this.roomCheck(classSchedule, weekDayNum)

      // yes day, yes time, yes room
      else if (day && time && room) goodToGo = this.checkTimeAndRoom(classSchedule, weekDayNum)

      if (goodToGo) { dispatch(setLookupAbsenceLocation(value)) }
    }
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

LocationRadio.defaultProps = {
  childIndex: -1,
  location: '',
  day: null,
  time: null,
  room: null,
}

LocationRadio.propTypes = {
  dispatch: PropTypes.func.isRequired,
  childIndex: PropTypes.number,
  location: PropTypes.string,
  day: PropTypes.string,
  time: PropTypes.string,
  room: PropTypes.string,
  fairfaxClassSchedule: classScheduleModifiedPropTypes.isRequired,
  chantillyClassSchedule: classScheduleModifiedPropTypes.isRequired,
}

const mapStateToProps = (state, props) => {
  if (props.childIndex > -1) {
    return {
      location: state.absenceChildren[props.childIndex].location,
    }
  }

  return {
    location: state.makeup.lookupAbsenceLocation,
    fairfaxClassSchedule: state.fairfaxClassScheduleModified,
    chantillyClassSchedule: state.chantillyClassScheduleModified,
    day: state.makeup.lookupAbsenceDay,
    time: state.makeup.lookupAbsenceTime,
    room: state.makeup.lookupAbsenceRoom,
  }
}

export default connect(mapStateToProps)(LocationRadio)
