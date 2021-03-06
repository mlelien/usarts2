import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { SingleDatePicker } from 'react-dates'
import moment from 'moment'
import PropTypes from 'prop-types'
import { setDate } from '../redux/actions/AbsenceActions'
import { getClassSchedule } from '../helpers/makeupHelpers'

class EnterDate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      calendarFocused: false,
    }
  }

  onDateChange = (newDate) => {
    const { dispatch, childIndex } = this.props

    if (newDate) {
      dispatch(setDate(newDate, childIndex))
    }
  };

  onCalendarFocusChanged = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }))
  };

  isOutsideRange = (calendarDay) => {
    const { location, fairfaxClassSchedule, chantillyClassSchedule } = this.props

    const isToday = calendarDay.isSame(moment(), 'day')
    const isInPast = calendarDay.isBefore(moment())

    const classOnDay = location === 'Fairfax'
      ? fairfaxClassSchedule[Number(calendarDay.format('d'))].length !== 0
      : chantillyClassSchedule[Number(calendarDay.format('d'))].length !== 0

    return isToday || isInPast || !classOnDay
  }

  render() {
    const { date } = this.props
    const { calendarFocused } = this.state

    return (
      <SingleDatePicker
        date={date}
        onDateChange={this.onDateChange}
        focused={calendarFocused}
        onFocusChange={this.onCalendarFocusChanged}
        numberOfMonths={1}
        // isOutsideRange={() => false}
        isOutsideRange={calendarDay => this.isOutsideRange(calendarDay)}
      />
    )
  }
}

EnterDate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  childIndex: PropTypes.number.isRequired,
}

const mapStateToProps = (state, props) => ({
  date: state.absenceChildren[props.childIndex].date,
  location: state.absenceChildren[props.childIndex].location,
  selectedRoom: state.absenceChildren[props.childIndex].room,
  fairfaxClassSchedule: state.fairfaxClassScheduleModified,
  chantillyClassSchedule: state.chantillyClassScheduleModified,
})

export default connect(mapStateToProps)(EnterDate)
