/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { SingleDatePicker } from 'react-dates'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import LocationRadio from '../components/makeup/LocationRadio'
import RoomCheckbox from '../components/makeup/RoomCheckbox'
import {
  getAbsences, getRooms, getClassSchedule, getUniqueElem,
} from '../helpers/makeupHelpers'
import { absencesPropTypes, makeupLocationPropTypes, historyPropType } from '../helpers/propTypes'


import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import '../css/Calendar.css'
import '../css/Makeup.css'
import { setMakeupDate, setRoomMakeup } from '../redux/actions/MakeupActions'
import { MakeupContainer, Space } from '../css/testtest'

const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 3rem;
`

const RowItem = styled.div`
  margin-right: 5rem;
`

class Makeup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedDate: null,
    }
  }

  getAvailabilityCount = (roomObj, selectedDate) => {
    const { fairfax, absences, makeupSheets } = this.props
    const { roomNumber } = roomObj
    const [month, day] = selectedDate.format('l').split('/')

    const max = fairfax.rooms[roomNumber]

    let absenceCount = 0
    if (absences[month] && absences[month][day]) {
      absenceCount = absences[month][day]
    }

    let makeupCount = 0
    makeupSheets.forEach((makeup) => {
      const makeupDate = makeup['Makeup Date']
      const [makeupMonth, makeupDay] = makeupDate.split('/')

      if (makeupMonth === month && makeupDay === day) makeupCount += 1
    })

    return max - absenceCount - makeupCount
  }

  setTableJSX = () => {
    const { selectedDate } = this.state

    if (selectedDate) {
      const { roomsJSX, tableDataJSX } = this.setTableData(selectedDate)

      return (
        <table>
          <thead>
            <tr>
              <th />
              {roomsJSX}
            </tr>
          </thead>
          <tbody>
            {tableDataJSX}
          </tbody>
        </table>
      )
    }
    return null
  }

  setTableData = (selectedDate) => {
    const { roomsChecked } = this.props

    const currData = this.getDataOnDay(selectedDate)
    const showRooms = []; const availabilityBtns = []; let times = []

    currData.forEach((roomObj) => {
      const { roomNumber, time } = roomObj

      if (roomsChecked[roomNumber - 1]) {
        showRooms.push(`Room ${roomNumber}`)
        times.push(time)
        availabilityBtns.push(this.setAvailabilityBtn(roomObj, selectedDate, time, roomNumber))
      }
    })

    times = getUniqueElem(times)
    const roomsJSX = getUniqueElem(showRooms).map(room => <th key={room}>{room}</th>)
    const tableDataJSX = this.showTimesAndButtons(times, availabilityBtns)

    return {
      roomsJSX,
      tableDataJSX,
    }
  }

  getDataOnDay = (selectedDate) => {
    const { fairfax, chantilly, location } = this.props
    const { classSchedule } = location === 'Fairfax' ? fairfax : chantilly

    return classSchedule[selectedDate.day()]
  }

  setAvailabilityBtn = (roomObj, selectedDate, time, roomNumber) => {
    const availability = this.getAvailabilityCount(roomObj, selectedDate)

    return {
      time,
      roomNumber,
      text: `${availability} spot${availability > 1 && 's'}`,
    }
  }

  onDateChange = (selectedDate) => {
    this.setState({
      selectedDate,
    })
  }

  isOutsideRange = (calendarDay) => {
    // TODO: four month cut off
    const isToday = calendarDay.isSame(moment(), 'day')
    const isInPast = calendarDay.isBefore(moment())
    const { fairfax, chantilly, location } = this.props
    const classOnDay = location === 'Fairfax'
      ? fairfax.classSchedule[Number(calendarDay.format('d'))].length !== 0
      : chantilly.classSchedule[Number(calendarDay.format('d'))].length !== 0

    return isToday || isInPast || !classOnDay
  }

  onBtnClick = (roomNumber) => {
    const { selectedDate } = this.state
    const { dispatch } = this.props

    dispatch(setRoomMakeup(roomNumber))
    dispatch(setMakeupDate(selectedDate.format('l')))
  }

  getAvailabilityItemJSX = (btns, time) => {
    const { selectedDate } = this.state
    const jsx = []

    jsx.push(<th key={time}>{time}</th>)
    const rowBtn = btns.filter(btn => btn.time === time)
    rowBtn.forEach((btn, i) => {
      const location = {
        pathname: '/makeup-continued',
        date: selectedDate.format('l'),
        time,
      }

      jsx.push(
        <td key={i}>
          <Link to={location} onClick={() => this.onBtnClick(btn.roomNumber)}>
            <button className='makeup-btn' type='button'>{btn.text}</button>
          </Link>
        </td>,
      )
    })

    return jsx
  }

  showTimesAndButtons = (times, availabilityBtns) => {
    const jsx = []

    times.forEach((time, i) => {
      jsx.push(<tr key={i}>{this.getAvailabilityItemJSX(availabilityBtns, time)}</tr>)
    })

    return jsx
  }

  render() {
    const { selectedDate } = this.state

    return (
      <div className='container'>
        <div className="title">Mark an Absence</div>
        <p>Please fill out an absence form before submitting a makeup request.</p>
        <Row>
          <RowItem>
            <SingleDatePicker
              date={selectedDate}
              onDateChange={this.onDateChange}
              focused
              onFocusChange={() => true}
              numberOfMonths={1}
              isOutsideRange={calendarDay => this.isOutsideRange(calendarDay)}
            />
          </RowItem>
          <RowItem>
            <LocationRadio />
            <Space />
            <RoomCheckbox />
            {selectedDate && <p>Availability for <b>{selectedDate.format('dddd, MMM Do')}</b></p>}
            {this.setTableJSX()}
          </RowItem>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    fairfaxClassSchedule, fairfaxRooms, chantillyClassSchedule, chantillyRooms, absences, makeup,
  } = state

  return {
    fairfax: {
      classSchedule: getClassSchedule(fairfaxClassSchedule),
      rooms: getRooms(fairfaxRooms),
    },
    chantilly: {
      classSchedule: getClassSchedule(chantillyClassSchedule),
      rooms: getRooms(chantillyRooms),
    },
    absences: getAbsences(absences),
    makeupSheets: state.makeupSheets,
    location: makeup.location,
    roomsChecked: makeup.roomsCheckboxes,
  }
}

Makeup.defaultProps = {
  location: 'Fairfax',
}

Makeup.propTypes = {
  absences: absencesPropTypes.isRequired,
  fairfax: makeupLocationPropTypes.isRequired,
  chantilly: makeupLocationPropTypes.isRequired,
  location: PropTypes.string,
  roomsChecked: PropTypes.arrayOf(PropTypes.bool).isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default withRouter(connect(mapStateToProps)(Makeup))
