import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { SingleDatePicker } from 'react-dates'
import moment from 'moment'
import PropTypes from 'prop-types'
import { setDate } from '../redux/actions/AbsenceActions'
import '../css/Calendar.css'

class EnterDate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      date: props.value,
      calendarFocused: false,
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(setDate(moment()))
  }

  onDateChange = (date) => {
    const { dispatch, childIndex } = this.props

    if (date) {
      this.setState(() => ({ date }))
      dispatch(setDate(date, childIndex))
    }
  };

  onCalendarFocusChanged = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }))
  };

  render() {
    const { calendarFocused, date } = this.state
    return (
      <SingleDatePicker
        date={date}
        onDateChange={this.onDateChange}
        focused={calendarFocused}
        onFocusChange={this.onCalendarFocusChanged}
        numberOfMonths={1}
        isOutsideRange={() => false}
      />
    )
  }
}

EnterDate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  childIndex: PropTypes.number.isRequired,
}

export default connect()(EnterDate)
