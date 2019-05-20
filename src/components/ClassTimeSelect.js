import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setClassTime } from '../redux/actions/AbsenceActions'
import { classScheduleModifiedPropTypes } from '../helpers/propTypes'
import { getClassSchedule, getUniqueElem } from '../helpers/makeupHelpers'

class ClassTimeSelect extends Component {
  timeOptions = () => {
    const {
      fairfaxClassSchedule, chantillyClassSchedule, location, dayOfWeek, dispatch, childIndex, selectedTime,
    } = this.props

    if (dayOfWeek !== -1) {
      const normalTimes = location === 'Fairfax'
        ? getUniqueElem(fairfaxClassSchedule[dayOfWeek].map(roomObj => roomObj.time))
        : getUniqueElem(chantillyClassSchedule[dayOfWeek].map(roomObj => roomObj.time))

      normalTimes.sort((a, b) => new Date(`1970/01/01 ${a}`) - new Date(`1970/01/01 ${b}`))

      const matchingTimes = normalTimes.filter(normalTime => normalTime === selectedTime)
      if (matchingTimes.length === 0) { dispatch(setClassTime(normalTimes[0], childIndex)) }

      return normalTimes.map(time => <option key={time} value={time}>{time}</option>)
    }
    return null
  }

  onChange = (event) => {
    const { dispatch, childIndex } = this.props
    dispatch(setClassTime(event.target.value, childIndex))
  }

  render() {
    const { selectedTime } = this.props

    return (
      <label className='input-group'>
        <span>Class Time</span>
        <select className='select' value={selectedTime} onChange={this.onChange}>
          {this.timeOptions()}
        </select>
      </label>
    )
  }
}

ClassTimeSelect.propTypes = {
  dispatch: PropTypes.func.isRequired,
  selectedTime: PropTypes.string.isRequired,
  dayOfWeek: PropTypes.number.isRequired,
  childIndex: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  fairfaxClassSchedule: classScheduleModifiedPropTypes.isRequired,
  chantillyClassSchedule: classScheduleModifiedPropTypes.isRequired,
}

const mapStateToProps = (state, props) => {
  const { date } = state.absenceChildren[props.childIndex]
  const dayOfWeek = date ? date.day() : -1

  return {
    location: state.absenceChildren[props.childIndex].location,
    selectedTime: state.absenceChildren[props.childIndex].classTime,
    dayOfWeek,
    // fairfaxClassSchedule: [],
    // chantillyClassSchedule: [],
    fairfaxClassSchedule: getClassSchedule(state.fairfaxClassSchedule),
    chantillyClassSchedule: getClassSchedule(state.chantillyClassSchedule),
  }
}

export default connect(mapStateToProps)(ClassTimeSelect)
