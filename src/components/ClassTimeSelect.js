import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import { setClassTime } from '../redux/actions/AbsenceActions'
import { hasFileBeenModified, turnToNormalTime } from '../dataHelper'

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
    const fairfaxSavedData = JSON.parse(localStorage.getItem(process.env.CLASS_SCHEDULE_FAIRFAX))
    const chantillySavedData = JSON.parse(localStorage.getItem(process.env.CLASS_SCHEDULE_CHANTILLY))

    if (!fairfaxSavedData) {
      this.backendGetData(process.env.CLASS_SCHEDULE_FAIRFAX)
    } else if (fairfaxSavedData && process.env.NODE_ENV !== 'development' && hasFileBeenModified(fairfaxSavedData, process.env.CLASS_SCHEDULE_FAIRFAX)) {
      this.backendGetData(process.env.CLASS_SCHEDULE_FAIRFAX)
    } else {
      const editedData = fairfaxSavedData.slice(1)
      const fairfaxTimes = editedData.map(timeObj => turnToNormalTime(timeObj))
      this.loadDataToState(fairfaxTimes, process.env.CLASS_SCHEDULE_FAIRFAX)
    }

    if (!chantillySavedData) {
      this.backendGetData(process.env.CLASS_SCHEDULE_CHANTILLY)
    } else if (chantillySavedData && process.env.NODE_ENV !== 'development' && hasFileBeenModified(chantillySavedData, process.env.CLASS_SCHEDULE_CHANTILLY)) {
      this.backendGetData(process.env.CLASS_SCHEDULE_CHANTILLY)
    } else {
      const editedData = chantillySavedData.slice(1)
      const chantillyTimes = editedData.map(timeObj => turnToNormalTime(timeObj))
      this.loadDataToState(chantillyTimes, process.env.CLASS_SCHEDULE_CHANTILLY)
    }
  }

  loadDataToState = (data, spreadsheetId) => {
    if (spreadsheetId === process.env.CLASS_SCHEDULE_FAIRFAX) {
      this.setState({ fairfaxTimes: data })
    } else {
      this.setState({ chantillyTimes: data })
    }
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
