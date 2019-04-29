import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import '../css/Calendar.css'
import { SingleDatePicker } from 'react-dates' //eslint-disable-line


/*
constructor(props) {
    super(props)

    this.state = {
      events: [],
    }
  }

  componentDidMount() {
    Tabletop.init({
      key: process.env.CLASS_SCHEDULE_FAIRFAX,
      callback: (data) => {
        this.setState({ data })
      },
      simpleSheet: true,
    })

    const url = `https://www.googleapis.com/calendar/v3/calendars/${process.env.GOOGLE_CALENDAR_ID}/events?key=${process.env.GOOGLE_CALENDAR_API}`
    fetch(url)
      .then(response => response.json())
      .then((data) => {
        const events = []
        data.items.map((event) => {
          const {
            start, end, location, summary,
          } = event
          events.push({
            start,
            end,
            room: location,
            city: summary,
          })
        })

        this.setState({
          events,
        })
      })
      */

const localizer = BigCalendar.momentLocalizer(moment)

const events = [
  {
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2019, 4, 10),
    end: new Date(2019, 4, 11),
  },
]

class Makeup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      date: moment(),
    }
  }

  onDateChange = (date) => {
    if (date) {
      this.setState(() => ({ date }))
    }
  }

  onCalendarFocusChanged = () => true

  render() {
    const { date } = this.state
    const date1 = moment().subtract(1, 'days')
    const date2 = moment().subtract(2, 'days')

    return (
      <div className="container">
      Makeup
        <div>
          <SingleDatePicker
            date={date}
            onDateChange={this.onDateChange}
            focused
            onFocusChange={this.onCalendarFocusChanged}
            numberOfMonths={1}
            isOutsideRange={(day) => {
              if (day.isSame(date1, 'day')) return true
              return false
            }}
          />
          {/* <BigCalendar
        localizer={localizer}
        events={events}
        defaultDate={new Date(2019, 4, 1)}
        startAccessor="startDate"
        endAccessor="endDate"
      /> */}
        </div>
      </div>
    )
  }
}

export default Makeup
