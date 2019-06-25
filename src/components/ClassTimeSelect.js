import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setClassTime } from '../redux/actions/AbsenceActions'
import { classSchedulePropTypes } from '../helpers/propTypes'
import { getClassSchedule, getUniqueElem } from '../helpers/makeupHelpers'
import {
  turnToNormalTime, sortTimes, turnToWeekDay, weekDayToNumber,
} from '../helpers/timeHelpers'
import { setLookupAbsenceTime } from '../redux/actions/MakeupActions'

class ClassTimeSelect extends Component {
  getSpecificTimes = () => {
    const {
      location, fairfaxClassSchedule, chantillyClassSchedule, dayOfWeek, selectedTime, childIndex, dispatch,
    } = this.props

    const normalTimes = location === 'Fairfax'
      ? getUniqueElem(getClassSchedule(fairfaxClassSchedule)[dayOfWeek].map(roomObj => roomObj.time))
      : getUniqueElem(getClassSchedule(chantillyClassSchedule)[dayOfWeek].map(roomObj => roomObj.time))

    sortTimes(normalTimes)

    const matchingTimes = normalTimes.filter(normalTime => normalTime === selectedTime)
    if (matchingTimes.length === 0) {
      if (childIndex > -1) dispatch(setClassTime(normalTimes[0], childIndex))
      else dispatch(setLookupAbsenceTime(normalTimes[0]))
    }

    return normalTimes
  }

  getSpecificTimesJSX = () => this.getSpecificTimes().map(time => <option key={time} value={time}>{time}</option>)

  getAllTimesJSX = () => {
    const { fairfaxClassSchedule, chantillyClassSchedule } = this.props

    const allTimes = fairfaxClassSchedule.map(classObj => turnToNormalTime(classObj))
    chantillyClassSchedule.forEach(classObj => allTimes.push(turnToNormalTime(classObj)))
    const allUniqueTimes = sortTimes(getUniqueElem(allTimes)).map(time => <option key={time} value={time}>{time}</option>)
    return [<option key='blank' />, ...allUniqueTimes]
  }

  getSchedule = () => {
    const { location, fairfaxClassScheduleModified, chantillyClassScheduleModified } = this.props
    if (location === 'Fairfax') return fairfaxClassScheduleModified
    if (location === 'Chantilly') return chantillyClassScheduleModified

    const schedule = []
    for (let i = 0; i < 7; i++) {
      schedule.push(fairfaxClassScheduleModified[i].concat(chantillyClassScheduleModified[i]))
    }
    return schedule
  }

  showAbsenceLookupJSX = () => {
    const { room, day } = this.props

    const dayNum = weekDayToNumber(day)
    const schedule = this.getSchedule()
    const times = []
    const timesJSX = [<option key='blank' />]

    // yes day, no room
    if (day && !room) {
      const classArr = schedule[dayNum]
      classArr.forEach(classObj => times.push(classObj.time))
      sortTimes(getUniqueElem(times)).forEach(time => timesJSX.push(<option key={time} value={time}>{time}</option>))
    }

    // no day, yes room,
    else if (!day && room) {
      schedule.forEach((classArr) => {
        classArr.forEach((classObj) => {
          if (classObj.roomNumber === room) { times.push(classObj.time) }
        })
      })
      sortTimes(getUniqueElem(times)).forEach(time => timesJSX.push(<option key={time} value={time}>{time}</option>))
    }

    // yes day, yes room
    else if (day && room) {
      const classArr = schedule[dayNum]
      classArr.forEach((classObj) => {
        if (classObj.roomNumber === room) { times.push(classObj.time) }
      })

      sortTimes(getUniqueElem(times)).forEach(time => timesJSX.push(<option key={time} value={time}>{time}</option>))
    }

    // no day, no room
    else if (!day && !room) {
      return this.getAllTimesJSX()
    }

    return timesJSX
  }

  timeOptions = () => {
    const { dayOfWeek, childIndex } = this.props

    if (childIndex === -1) {
      return this.showAbsenceLookupJSX()
    }

    if (dayOfWeek !== -1) {
      return this.getSpecificTimesJSX()
    }

    return this.getAllTimesJSX()
  }

  onChange = (event) => {
    const { dispatch, childIndex } = this.props

    if (childIndex > -1) dispatch(setClassTime(event.target.value, childIndex))
    else dispatch(setLookupAbsenceTime(event.target.value))
  }

  render() {
    const { selectedTime } = this.props

    return (
      <select id='classTime' className='form-control' value={selectedTime} onChange={this.onChange}>
        {this.timeOptions()}
      </select>
    )
  }
}

ClassTimeSelect.defaultProps = {
  childIndex: -1,
  selectedTime: '',
  dayOfWeek: null,
  location: null,
  day: null,
}

ClassTimeSelect.propTypes = {
  dispatch: PropTypes.func.isRequired,
  selectedTime: PropTypes.string,
  childIndex: PropTypes.number,
  dayOfWeek: PropTypes.number,
  location: PropTypes.string,
  day: PropTypes.string,
  fairfaxClassSchedule: classSchedulePropTypes.isRequired,
  chantillyClassSchedule: classSchedulePropTypes.isRequired,
}

const mapStateToProps = (state, props) => {
  if (props.childIndex > -1) {
    const { date } = state.absenceChildren[props.childIndex]
    const dayOfWeek = date ? date.day() : -1

    return {
      location: state.absenceChildren[props.childIndex].location,
      selectedTime: state.absenceChildren[props.childIndex].classTime,
      dayOfWeek,
      fairfaxClassSchedule: state.fairfaxClassSchedule,
      chantillyClassSchedule: state.chantillyClassSchedule,
    }
  }

  return {
    location: state.makeup.lookupAbsenceLocation,
    selectedTime: state.makeup.lookupAbsenceTime,
    day: state.makeup.lookupAbsenceDay,
    room: state.makeup.lookupAbsenceRoom,
    fairfaxClassSchedule: state.fairfaxClassSchedule,
    chantillyClassSchedule: state.chantillyClassSchedule,
    fairfaxClassScheduleModified: state.fairfaxClassScheduleModified,
    chantillyClassScheduleModified: state.chantillyClassScheduleModified,
  }
}

export default connect(mapStateToProps)(ClassTimeSelect)
