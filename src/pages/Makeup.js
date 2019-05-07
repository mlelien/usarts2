import React, { Component } from 'react'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import styled from 'styled-components'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import '../css/Calendar.css'
import { SingleDatePicker } from 'react-dates'
import { connect } from 'react-redux'
import { hasFileBeenModified, getData } from '../helpers/dataHelpers'
import {
  turnToNormalDate, daysOnly, turnToNormalDay, turnToNormalTime,
} from '../helpers/timeHelpers'
import LocationRadio from '../components/calendar/LocationRadio'
import RoomCheckbox from '../components/calendar/RoomCheckbox'

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
`

const RowItem = styled.div`
align-content: space-between;
align-items: space-between;
  justify-content: space-between;
`

class Makeup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedDate: null,
      absences: [
        new Array(31),
        new Array(31),
        new Array(31),
        new Array(31),
      ],
      fairfaxClassSchedule: [],
      fairfaxRooms: [],
    }
  }

  componentDidMount() {
    const fairfaxClassSchedule = getData(process.env.CLASS_SCHEDULE_FAIRFAX)
    const fairfaxRooms = getData(process.env.ROOM_FAIRFAX)
    const absences = getData(process.env.ABSENCES_SHEET)

    this.loadDataToState(fairfaxClassSchedule.slice(1), process.env.CLASS_SCHEDULE_FAIRFAX)
    this.loadDataToState(fairfaxRooms.slice(1), process.env.ROOM_FAIRFAX)
    this.loadDataToState(absences.slice(1), process.env.ABSENCES_SHEET)
  }

  loadDataToState = (data, spreadsheetId) => {
    if (spreadsheetId === process.env.ROOM_FAIRFAX) {
      this.setState({
        fairfaxRooms: data,
      })
    } else if (spreadsheetId === process.env.ABSENCES_SHEET) {
      data.forEach((absenceObj) => {
        const absenceDateObj = moment(absenceObj['Absence Date'], 'MM/DD/YYYY')
        const fourMonthsAgoDateObj = moment().subtract(4, 'months')
        const absenceBetweenFourMonths = absenceDateObj.isBetween(fourMonthsAgoDateObj, moment().add(1, 'days'))

        if (absenceBetweenFourMonths) {
          this.setState((prevState) => {
            const { absences } = prevState
            const currMonth = moment().format('M')
            const [month, day] = absenceObj['Absence Date'].split('/')
            absences[currMonth - month][day] = absenceObj
            return {
              absences,
            }
          })
        }
      })
    }
    // else {
    //   this.setState({ chantillyTimes: data })
    // }
  }

  onDateChange = (selectedDate) => {
    const { fairfax } = this.props
    // console.log(fairfax[selectedDate.day()])

    if (selectedDate) {
      this.setState(() => ({ selectedDate }))
    }
  }

  onCalendarFocusChanged = () => true

  isOutsideRange = (calendarDay) => {
    const isInPast = calendarDay.isBefore(moment())
    const { fairfax } = this.props
    const classOnDay = fairfax[Number(calendarDay.format('d'))].length !== 0
    // const {
    //   fairfaxClassSchedule, fairfaxRooms, absences,
    // } = this.state
    // console.log(fairfaxRooms)
    // const { daysAvailable } = fairfax
    // const isMatchingDay = daysAvailable.filter(day => day === Number(calendarDay.format('d'))).length === 0

    return isInPast || !classOnDay
  }

  render() {
    const {
      selectedDate, fairfaxClassSchedule, fairfaxRooms, absences,
    } = this.state
    // console.log(fairfaxClassSchedule)
    // console.log(fairfaxRooms)
    // console.log(absences)
    return (
      <div className="container">
        <div className="title">Mark an Absence</div>
        <p>Please fill out an absence form before submitting a makeup request.</p>
        <Row>
          <SingleDatePicker
            date={selectedDate}
            onDateChange={this.onDateChange}
            focused
            onFocusChange={this.onCalendarFocusChanged}
            numberOfMonths={1}
            isOutsideRange={calendarDay => this.isOutsideRange(calendarDay)}
          />
          <LocationRadio />
          <div />
          <RoomCheckbox />
        </Row>
      </div>
    )
  }
}

const mapDispatchToProps = (state) => {
  const fairfaxClassSchedule = state.fairfaxClassSchedule.slice(1)

  const fairfax = [[], [], [], [], [], [], []]

  fairfaxClassSchedule.forEach((schedObj) => {
    const dayNum = turnToNormalDay(schedObj)
    const time = turnToNormalTime(schedObj)
    fairfax[dayNum].push({
      roomNumber: schedObj['Room No'],
      time,
    })
  })

  return {
    fairfax,
  }
}

export default connect(mapDispatchToProps)(Makeup)
