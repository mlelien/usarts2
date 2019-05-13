/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { SingleDatePicker } from 'react-dates'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import LocationRadio from '../components/makeup/LocationRadio'
import RoomCheckbox from '../components/makeup/RoomCheckbox'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import '../css/Calendar.css'
import '../css/Makeup.css'
import {
  getAbsences, getRooms, getClassSchedule, getUniqueElem,
} from '../helpers/makeupHelpers'
import { absencesPropTypes, makeupLocationPropTypes } from '../helpers/propTypes'

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
      showRooms: [],
      times: [],
      availabilityBtns: [],
    }
  }

  getAvailabilityCount = (roomObj, month, day) => {
    const { fairfax, absences } = this.props
    const { roomNumber } = roomObj

    const max = fairfax.rooms[roomNumber]
    let absenceCount = 0

    if (absences[month] && absences[month][day]) {
      absenceCount = absences[month][day]
    }

    return max - absenceCount
  }

  setTableJSX = () => {
    const { showRooms } = this.state

    return (
      <table>
        <thead>
          <tr>
            <th />
            {showRooms}
          </tr>
        </thead>
        <tbody>
          {this.showAvailabilityRows()}
        </tbody>
      </table>
    )
  }

  setTableData = (selectedDate) => {
    const {
      fairfax, chantilly, location, roomsChecked,
    } = this.props

    const { classSchedule } = location === 'Fairfax' ? fairfax : chantilly

    const currData = classSchedule[selectedDate.day()]
    const showRooms = []
    const availabilityBtns = []
    let times = []

    const [month, day] = selectedDate.format('l').split('/')
    currData.forEach((roomObj) => {
      const { roomNumber, time } = roomObj

      if (roomsChecked[roomNumber - 1]) {
        const availability = this.getAvailabilityCount(roomObj, month, day)
        showRooms.push(`Room ${roomNumber}`)
        times.push(time)
        availabilityBtns.push({
          time,
          roomNumber,
          text: `${availability} spot${availability > 1 && 's'}`,
        })
      }
    })

    times = getUniqueElem(times)
    const showRoomsJSX = getUniqueElem(showRooms).map(room => <th key={room}>{room}</th>)

    this.setState(() => ({
      selectedDate,
      showRooms: showRoomsJSX,
      availabilityBtns,
      times,
    }))
  }

  onDateChange = (selectedDate) => {
    this.setTableData(selectedDate)
  }

  isOutsideRange = (calendarDay) => {
    // TODO: four month cut off
    const isInPast = calendarDay.isBefore(moment())
    const { fairfax, chantilly, location } = this.props
    const classOnDay = location === 'Fairfax'
      ? fairfax.classSchedule[Number(calendarDay.format('d'))].length !== 0
      : chantilly.classSchedule[Number(calendarDay.format('d'))].length !== 0

    return isInPast || !classOnDay
  }

  getAvailabilityItemJSX = (btns, time) => {
    const jsx = []

    jsx.push(<th>{time}</th>)
    const rowBtn = btns.filter(btn => btn.time === time)
    rowBtn.forEach((btn, i) => {
      jsx.push(<td key={i}><button type='button'>{btn.text}</button></td>)
    })

    return jsx
  }

  showAvailabilityRows = () => {
    const { times, availabilityBtns } = this.state
    const jsx = []

    times.forEach((time, i) => {
      jsx.push(<tr key={i}>{this.getAvailabilityItemJSX(availabilityBtns, time)}</tr>)
    })

    return jsx
  }

  render() {
    const {
      selectedDate, showRooms,
    } = this.state

    return (
      <div className="container">
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
            <RoomCheckbox />
            {selectedDate && <p>Availability for <b>{selectedDate.format('dddd, MMM Do')}</b></p>}
            {this.setTableJSX()}
          </RowItem>
          {/* <div /> */}
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
    location: makeup.location,
    roomsChecked: makeup.roomsCheckboxes,
  }
}

Makeup.propTypes = {
  absences: absencesPropTypes.isRequired,
  fairfax: makeupLocationPropTypes.isRequired,
  chantilly: makeupLocationPropTypes.isRequired,
  location: PropTypes.string.isRequired,
  roomsChecked: PropTypes.arrayOf(PropTypes.bool).isRequired,
}

export default connect(mapStateToProps)(Makeup)
