/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { SingleDatePicker } from 'react-dates'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import LocationRadio from '../components/calendar/LocationRadio'
import RoomCheckbox from '../components/calendar/RoomCheckbox'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import '../css/Calendar.css'
import '../css/Makeup.css'
import {
  getAbsences, getRooms, getClassSchedule, absencesPropTypes, classSchedulePropTypes,
} from '../helpers/makeupHelpers'

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
    const { fairfaxRooms, absences } = this.props
    const { roomNumber } = roomObj

    const max = fairfaxRooms[roomNumber]
    let absenceCount = 0

    if (absences[month] && absences[month][day]) {
      absenceCount = absences[month][day]
    }

    return max - absenceCount
  }

  getUniqueElem = arr => Array.from(new Set(arr))

  onDateChange = (selectedDate) => {
    const { fairfaxClassSchedule } = this.props

    if (selectedDate) {
      const currData = fairfaxClassSchedule[selectedDate.day()]
      const showRooms = []
      const availabilityBtns = []
      let times = []

      const [month, day] = selectedDate.format('l').split('/')
      currData.forEach((roomObj) => {
        const { roomNumber, time } = roomObj

        const availability = this.getAvailabilityCount(roomObj, month, day)
        showRooms.push(`Room ${roomNumber}`)
        times.push(time)
        availabilityBtns.push({
          time,
          roomNumber,
          text: `${availability} spot${availability > 1 && 's'}`,
        })
      })

      times = this.getUniqueElem(times)
      const showRoomsJSX = this.getUniqueElem(showRooms).map(room => <th>{room}</th>)

      this.setState(() => ({
        selectedDate,
        showRooms: showRoomsJSX,
        availabilityBtns,
        times,
      }))
    }
  }

  isOutsideRange = (calendarDay) => {
    const isInPast = calendarDay.isBefore(moment())
    const { fairfaxClassSchedule } = this.props
    const classOnDay = fairfaxClassSchedule[Number(calendarDay.format('d'))].length !== 0

    return isInPast || !classOnDay
  }

  getAvailabilityItemJSX = (btns, time) => {
    const jsx = []

    jsx.push(<th>{time}</th>)
    const rowBtn = btns.filter(btn => btn.time === time)
    rowBtn.forEach((btn) => {
      jsx.push(<td><button type='button'>{btn.text}</button></td>)
    })

    return jsx
  }

  showAvailabilityRows = () => {
    const { times, availabilityBtns } = this.state
    const jsx = []

    times.forEach((time) => {
      jsx.push(<tr>{this.getAvailabilityItemJSX(availabilityBtns, time)}</tr>)
    })

    return jsx
  }

  render() {
    const {
      selectedDate, fairfaxClassSchedule, fairfaxRooms, absences, showRooms, times, availabilityBtns,
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
          </RowItem>
          {/* <div /> */}
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { fairfaxClassSchedule, fairfaxRooms, absences } = state

  return {
    fairfaxClassSchedule: getClassSchedule(fairfaxClassSchedule),
    fairfaxRooms: getRooms(fairfaxRooms),
    absences: getAbsences(absences),
    location: state.makeup.location,
  }
}

Makeup.propTypes = {
  absences: absencesPropTypes.isRequired,
  fairfaxClassSchedule: classSchedulePropTypes.isRequired,
  fairfaxRooms: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default connect(mapStateToProps)(Makeup)
