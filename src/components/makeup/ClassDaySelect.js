import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getUniqueElem } from '../../helpers/makeupHelpers'
import { turnToWeekDay } from '../../helpers/timeHelpers'
import { setLookupAbsenceDay } from '../../redux/actions/MakeupActions'
import { classScheduleModifiedPropTypes } from '../../helpers/propTypes'

class ClassDaySelect extends Component {
  onChange = (e) => {
    const { dispatch } = this.props
    dispatch(setLookupAbsenceDay(e.target.value))
  }

  getClassSchedule = () => {
    const { location, fairfaxClassSchedule, chantillyClassSchedule } = this.props

    if (location === 'Fairfax') return fairfaxClassSchedule
    if (location === 'Chantilly') return chantillyClassSchedule

    const allSchedule = []
    for (let i = 0; i < 7; i++) {
      const allLocDay = getUniqueElem([...fairfaxClassSchedule[i], ...chantillyClassSchedule[i]])
      allSchedule.push(allLocDay)
    }
    return allSchedule
  }

  makeupPageRender = () => {
    const { time, room } = this.props

    const classSchedule = this.getClassSchedule()
    const daysJSX = [<option key='blank' />]

    for (let i = 0; i < 7; i++) {
      // no time, no room
      if (!time && !room) {
        if (classSchedule[i].length > 0) {
          daysJSX.push(<option key={turnToWeekDay(i)}>{turnToWeekDay(i)}</option>)
        }
      }

      // yes time, no room
      else if (time && !room) {
        const times = classSchedule[i].filter(classObj => classObj.time === time)
        if (times.length > 0) {
          daysJSX.push(<option key={turnToWeekDay(i)}>{turnToWeekDay(i)}</option>)
        }
      }

      // no time, yes room
      else if (!time && room) {
        const rooms = classSchedule[i].filter(classObj => classObj.roomNumber === room)
        if (rooms.length > 0) {
          daysJSX.push(<option key={turnToWeekDay(i)}>{turnToWeekDay(i)}</option>)
        }
      }

      // yes time, yes room
      else if (time && room) {
        const timeAndRoom = classSchedule[i].filter(classObj => classObj.time === time && classObj.roomNumber === room)
        if (timeAndRoom.length > 0) daysJSX.push(<option key={turnToWeekDay(i)}>{turnToWeekDay(i)}</option>)
      }
    }

    return daysJSX
  }

  absencePageRender = () => {
    const { location, fairfaxClassSchedule, chantillyClassSchedule } = this.props
    const classSchedule = location === 'Fairfax' ? fairfaxClassSchedule : chantillyClassSchedule

    const daysJSX = classSchedule.map((classObjArr, i) => {
      if (classObjArr.length !== 0) { return <option key={turnToWeekDay(i)}>{turnToWeekDay(i)}</option> }
    })

    return daysJSX
  }

  showOptions = () => {
    const { fromMakeupPage } = this.props

    if (fromMakeupPage) return this.makeupPageRender()

    return this.absencePageRender()
  }

  render() {
    return (
      <label className='input-group'>
        <span>Original Class Day</span>
        <select className='select' onChange={this.onChange}>
          {this.showOptions()}
        </select>
      </label>
    )
  }
}

ClassDaySelect.defaultProps = {
  location: null,
  time: null,
  room: null,
  selectedDay: null,
  fromMakeupPage: false,
}

ClassDaySelect.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.string,
  time: PropTypes.string,
  room: PropTypes.string,
  selectedDay: PropTypes.string,
  fairfaxClassSchedule: classScheduleModifiedPropTypes.isRequired,
  chantillyClassSchedule: classScheduleModifiedPropTypes.isRequired,
  fromMakeupPage: PropTypes.bool,
}

const mapStateToProps = state => ({
  location: state.makeup.lookupAbsenceLocation,
  time: state.makeup.lookupAbsenceTime,
  room: state.makeup.lookupAbsenceRoom,
  selectedDay: state.makeup.lookupAbsenceDay,
  fairfaxClassSchedule: state.fairfaxClassScheduleModified,
  chantillyClassSchedule: state.chantillyClassScheduleModified,
})

export default connect(mapStateToProps)(ClassDaySelect)
