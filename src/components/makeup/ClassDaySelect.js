import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getClassSchedule } from '../../helpers/makeupHelpers'
import { turnToLongDay } from '../../helpers/timeHelpers'
import { setLookupAbsenceDay } from '../../redux/actions/MakeupActions'

class ClassDaySelect extends Component {
  onChange = (e) => {
    const { dispatch } = this.props
    dispatch(setLookupAbsenceDay(e.target.value))
  }

  showOptions = () => {
    const { location, fairfaxClassSchedule, chantillyClassSchedule } = this.props
    if (!location) return null

    const classSchedule = location === 'Fairfax' ? fairfaxClassSchedule : chantillyClassSchedule

    const daysJSX = classSchedule.map((classObjArr, i) => {
      if (classObjArr.length !== 0) { return <option>{turnToLongDay(i)}</option> }
    })

    return daysJSX
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

const mapStateToProps = state => ({
  location: state.makeup.lookupAbsenceLocation,
  fairfaxClassSchedule: getClassSchedule(state.fairfaxClassSchedule),
  chantillyClassSchedule: getClassSchedule(state.chantillyClassSchedule),
})

export default connect(mapStateToProps)(ClassDaySelect)
