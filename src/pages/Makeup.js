import React, { Component } from 'react'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import styled from 'styled-components'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import '../css/Calendar.css'
import { SingleDatePicker } from 'react-dates'
import axios from 'axios'
import { hasFileBeenModified, turnToNormalDate } from '../dataHelper'
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
      date: null,
      fairfax: {
        times: [],
      },
      // chantillyTimes: [],
    }
  }

  componentDidMount() {
    const fairfaxSavedData = JSON.parse(localStorage.getItem(process.env.CLASS_SCHEDULE_FAIRFAX))
    // const chantillySavedData = JSON.parse(localStorage.getItem(process.env.CLASS_SCHEDULE_CHANTILLY))

    if (!fairfaxSavedData) {
      this.backendGetData(process.env.CLASS_SCHEDULE_FAIRFAX)
    } else if (fairfaxSavedData && process.env.NODE_ENV !== 'development' && hasFileBeenModified(fairfaxSavedData, process.env.CLASS_SCHEDULE_FAIRFAX)) {
      this.backendGetData(process.env.CLASS_SCHEDULE_FAIRFAX)
    } else {
      const editedData = fairfaxSavedData.slice(1)
      const fairfaxTimes = editedData.map(timeObj => turnToNormalDate(timeObj))
      console.log(fairfaxTimes[0])
      this.setState({
        fairfax: {
          times: fairfaxTimes,
        },
      })
      // this.loadDataToState(fairfaxTimes, process.env.CLASS_SCHEDULE_FAIRFAX)
    }
  }

  loadDataToState = (data, spreadsheetId) => {
    if (spreadsheetId === process.env.CLASS_SCHEDULE_FAIRFAX) {
      console.log(data)
      this.setState({
        fairfaxTimes: data,
      })
    }
    // else {
    //   this.setState({ chantillyTimes: data })
    // }
  }

  backendGetData = (spreadsheetId) => {
    axios
      .get('/api/getFieldData', {
        params: {
          spreadsheetId,
        },
      })
      .then((res) => {
        this.loadDataToState(res.data)
        const serializedData = JSON.stringify(res.data)
        localStorage.setItem(spreadsheetId, serializedData)
      })
  }

  onDateChange = (date) => {
    if (date) {
      this.setState(() => ({ date }))
    }
  }

  onCalendarFocusChanged = () => true

  isOutsideRange = (day) => {
    const { fairfaxTimes } = this.state
    console.log(fairfaxTimes)

    const matches = fairfaxTimes.filter(time => time.isSame(day, 'day'))
    return matches.length === 0
  }

  render() {
    const { date } = this.state
    return (
      <div className="container">
        <div className="title">Mark an Absence</div>
        <p>Please fill out an absence form before submitting a makeup request.</p>
        <Row>
          <SingleDatePicker
            date={date}
            onDateChange={this.onDateChange}
            focused
            onFocusChange={this.onCalendarFocusChanged}
            numberOfMonths={1}
            isOutsideRange={(calendarDay) => {
              const { times } = this.state.fairfax //eslint-disable-line
              const matches = times.filter((fairfaxTime) => {
                const day1 = fairfaxTime.format('dddd')
                const day2 = calendarDay.format('dddd')

                return day1 === day2
              })

              return matches.length === 0
            }}
          />
          <LocationRadio />
          <div />
          <RoomCheckbox />
        </Row>
      </div>
    )
  }
}

export default Makeup
