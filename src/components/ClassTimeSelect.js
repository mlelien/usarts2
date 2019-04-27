import React, { Component } from 'react'
import Tabletop from 'tabletop'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setClassTime } from '../redux/actions/AbsenceActions'

class ClassTimeSelect extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value,
      fairfaxTimes: [],
      chantillyTimes: [],
    }
  }

  componentDidMount() {
    Tabletop.init({
      key: process.env.CLASS_SCHEDULE_FAIRFAX,
      callback: (data) => {
        const fairfaxTimes = data.map(room => this.turnToNormalFormat(room['Seq No'], room.AMPM))
        this.setState({ fairfaxTimes })
      },
      simpleSheet: true,
    })

    Tabletop.init({
      key: process.env.CLASS_SCHEDULE_CHANTILLY,
      callback: (data) => {
        const chantillyTimes = data.map(room => this.turnToNormalFormat(room['Seq No'], room.AMPM))
        this.setState({ chantillyTimes })
      },
      simpleSheet: true,
    })
  }

  turnToNormalFormat = (timeGiven, amOrPm) => {
    const justTime = timeGiven.slice(1)

    if (justTime[0] === '0') {
      return `${justTime[1]}:${justTime[2]}${justTime[3]} ${amOrPm}`
    }

    return `${justTime[0]}${justTime[1]}:${justTime[2]}${justTime[3]} ${amOrPm}`
  }

  timeOptions = () => {
    const { fairfaxTimes, chantillyTimes } = this.state
    const allClassTimes = Array.from(new Set([...fairfaxTimes, ...chantillyTimes]))
    allClassTimes.sort((a, b) => new Date(`1970/01/01 ${a}`) - new Date(`1970/01/01 ${b}`))

    return allClassTimes.map(time => <option key={time} value={time}>{time}</option>)
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
}

export default connect()(ClassTimeSelect)
