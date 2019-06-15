import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setRoom } from '../redux/actions/AbsenceActions'
import { roomsPropTypes, classScheduleModifiedPropTypes } from '../helpers/propTypes'
import { getUniqueElem } from '../helpers/makeupHelpers'
import { weekDayToNumber } from '../helpers/timeHelpers'
import { setLookupAbsenceRoom } from '../redux/actions/MakeupActions'

class RoomSelect extends Component {
  roomOnDayJSX = () => {
    const {
      location, fairfaxClassSchedule, chantillyClassSchedule, dayOfWeek, dispatch, childIndex, selectedRoom,
    } = this.props

    const rooms = location === 'Fairfax'
      ? getUniqueElem(fairfaxClassSchedule[dayOfWeek].map(roomObj => roomObj.roomNumber))
      : getUniqueElem(chantillyClassSchedule[dayOfWeek].map(roomObj => roomObj.roomNumber))

    const matchingRooms = rooms.filter(room => room === selectedRoom)
    if (matchingRooms.length === 0) { dispatch(setRoom(rooms[0], childIndex)) }

    return rooms.map(room => <option key={room} value={room}>{room}</option>)
  }

  allRoomsJSX = () => {
    const { fairfaxRooms, chantillyRooms } = this.props

    const allRooms = fairfaxRooms.map(roomObj => roomObj['Room No.'])
    chantillyRooms.forEach(roomObj => allRooms.push(roomObj['Room No.']))

    const allRoomsJSX = getUniqueElem(allRooms).map(room => <option key={room} value={room}>{room}</option>)
    return [<option key='blank' />, ...allRoomsJSX]
  }

  absenceJSX = () => {
    const { dayOfWeek } = this.props

    if (dayOfWeek) return this.roomOnDayJSX()
    return this.allRoomsJSX()
  }

  getSchedule = () => {
    const { location, fairfaxClassSchedule, chantillyClassSchedule } = this.props
    if (location === 'Fairfax') return fairfaxClassSchedule
    if (location === 'Chantilly') return chantillyClassSchedule

    const schedule = []
    for (let i = 0; i < 7; i++) {
      schedule.push(fairfaxClassSchedule[i].concat(chantillyClassSchedule[i]))
    }
    return schedule
  }

  roomOptions = () => {
    const { childIndex, dayOfWeek, time } = this.props

    if (childIndex > -1) {
      return this.absenceJSX()
    }

    const rooms = []
    const jsx = [<option key='blank' />]
    const schedule = this.getSchedule()

    // yes day, yes time
    if (dayOfWeek && time) {
      const classArr = schedule[dayOfWeek]

      classArr.forEach((classObj) => {
        if (classObj.time === time) {
          rooms.push(classObj.roomNumber)
        }
      })
      getUniqueElem(rooms).forEach(room => jsx.push(<option key={room} value={room}>{room}</option>))
    }

    // yes day, no time
    else if (dayOfWeek && !time) {
      const classArr = schedule[dayOfWeek]
      classArr.forEach((classObj) => {
        rooms.push(classObj.roomNumber)
      })
      getUniqueElem(rooms).forEach(room => jsx.push(<option key={room} value={room}>{room}</option>))
    }

    // no day, yes time
    else if (!dayOfWeek && time) {
      schedule.forEach((classArr) => {
        classArr.forEach((classObj) => {
          if (classObj.time === time) { rooms.push(classObj.roomNumber) }
        })
      })

      getUniqueElem(rooms).forEach((room) => {
        jsx.push(<option key={room} value={room}>{room}</option>)
      })
    }

    // no day, no time
    else if (!dayOfWeek && !time) return this.allRoomsJSX()

    return jsx
  }

  onChange = (event) => {
    const { dispatch, childIndex } = this.props

    if (childIndex > -1) dispatch(setRoom(event.target.value, childIndex))
    else dispatch(setLookupAbsenceRoom(event.target.value))
  }

  render() {
    const { selectedRoom } = this.props

    return (
      <label className='input-group'>
        <span>Room #</span>
        <select className='select' value={selectedRoom} onChange={this.onChange}>
          {this.roomOptions()}
        </select>
      </label>
    )
  }
}

RoomSelect.defaultProps = {
  childIndex: -1,
  location: null,
  dayOfWeek: null,
  time: null,
}

RoomSelect.propTypes = {
  dispatch: PropTypes.func.isRequired,
  childIndex: PropTypes.number,
  location: PropTypes.string,
  dayOfWeek: PropTypes.number,
  selectedRoom: PropTypes.string.isRequired,
  fairfaxRooms: roomsPropTypes.isRequired,
  chantillyRooms: roomsPropTypes.isRequired,
  fairfaxClassSchedule: classScheduleModifiedPropTypes.isRequired,
  chantillyClassSchedule: classScheduleModifiedPropTypes.isRequired,
}

const mapStateToProps = (state, props) => {
  if (props.childIndex > -1) {
    const { childIndex } = props
    const { date } = state.absenceChildren[childIndex]

    return {
      location: state.absenceChildren[childIndex].location,
      dayOfWeek: date ? date.day() : null,
      selectedRoom: state.absenceChildren[childIndex].room,
      fairfaxRooms: state.fairfaxRooms,
      chantillyRooms: state.chantillyRooms,
      fairfaxClassSchedule: state.fairfaxClassScheduleModified,
      chantillyClassSchedule: state.chantillyClassScheduleModified,
    }
  }

  return {
    location: state.makeup.lookupAbsenceLocation,
    selectedRoom: state.makeup.lookupAbsenceRoom,
    dayOfWeek: weekDayToNumber(state.makeup.lookupAbsenceDay),
    time: state.makeup.lookupAbsenceTime,
    fairfaxRooms: state.fairfaxRooms,
    chantillyRooms: state.chantillyRooms,
    fairfaxClassSchedule: state.fairfaxClassScheduleModified,
    chantillyClassSchedule: state.chantillyClassScheduleModified,
  }
}

export default connect(mapStateToProps)(RoomSelect)
