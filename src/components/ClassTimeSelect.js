import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setClassTime } from '../redux/actions/AbsenceActions'
import { turnToNormalTime } from '../helpers/timeHelpers'
import { backendGetData } from '../helpers/dataHelpers'

class ClassTimeSelect extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value,
    }
  }

  timeOptions = () => {
    const { fairfaxClassSchedule, chantillyClassSchedule, location } = this.props

    const normalTimes = location === 'Fairfax'
      ? Array.from(new Set(fairfaxClassSchedule.map(timeObj => turnToNormalTime(timeObj))))
      : Array.from(new Set(chantillyClassSchedule.map(timeObj => turnToNormalTime(timeObj))))

    normalTimes.sort((a, b) => new Date(`1970/01/01 ${a}`) - new Date(`1970/01/01 ${b}`))

    return normalTimes.map(time => <option key={time} value={time}>{time}</option>)
  }

  onChange = (event) => {
    const { dispatch, childIndex } = this.props
    const { value } = event.target

    dispatch(setClassTime(value, childIndex))
    this.setState({
      value,
    })
  }

  render() {
    const { value } = this.state

    return (
      <label className='input-group'>
        <span>Class Time</span>
        <select className='select' value={value} onChange={this.onChange}>
          {this.timeOptions()}
        </select>
      </label>
    )
  }
}

ClassTimeSelect.defaultProps = {
  value: '',
}

ClassTimeSelect.propTypes = {
  dispatch: PropTypes.func.isRequired,
  value: PropTypes.string,
  childIndex: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  fairfaxClassSchedule: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  chantillyClassSchedule: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
}

const mapDispatchToProps = (state, props) => ({
  location: state.absenceChildren[props.childIndex].location,
  fairfaxClassSchedule: state.fairfaxClassSchedule,
  chantillyClassSchedule: state.chantillyClassSchedule,
})

export default connect(mapDispatchToProps)(ClassTimeSelect)
