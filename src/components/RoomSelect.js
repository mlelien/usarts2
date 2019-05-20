import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setRoom } from '../redux/actions/AbsenceActions'
import { classScheduleModifiedPropTypes } from '../helpers/propTypes'
import { getClassSchedule, getUniqueElem } from '../helpers/makeupHelpers'

class RoomSelect extends Component {
  roomOptions = () => {
    const {
      location, fairfaxRooms, chantillyRooms, dayOfWeek, dispatch, childIndex, selectedRoom,
    } = this.props

    if (dayOfWeek !== -1) {
      const rooms = location === 'Fairfax'
        ? getUniqueElem(fairfaxRooms[dayOfWeek].map(roomObj => roomObj.roomNumber))
        : getUniqueElem(chantillyRooms[dayOfWeek].map(roomObj => roomObj.roomNumber))

      const matchingRooms = rooms.filter(room => room === selectedRoom)
      if (matchingRooms.length === 0) { dispatch(setRoom(rooms[0], childIndex)) }

      return rooms.map(room => <option key={room} value={room}>{room}</option>)
    }

    return null
  }

  onChange = (event) => {
    const { dispatch, childIndex } = this.props

    dispatch(setRoom(event.target.value, childIndex))
  }

  render() {
    const { selectedRoom } = this.props

    return (
      <label className='input-group'>
        <span>Room #</span>
        <select className='select' value={selectedRoom} onChange={this.onChange}>
          {this.roomOptions()}
        </select>
      </label>
    )
  }
}

RoomSelect.propTypes = {
  dispatch: PropTypes.func.isRequired,
  childIndex: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  dayOfWeek: PropTypes.number.isRequired,
  selectedRoom: PropTypes.string.isRequired,
  fairfaxRooms: classScheduleModifiedPropTypes.isRequired,
  chantillyRooms: classScheduleModifiedPropTypes.isRequired,
}

const mapStateToProps = (state, props) => {
  const { date } = state.absenceChildren[props.childIndex]
  const dayOfWeek = date ? date.day() : -1

  return {
    location: state.absenceChildren[props.childIndex].location,
    dayOfWeek,
    selectedRoom: state.absenceChildren[props.childIndex].room,
    // fairfaxRooms: [],
    // chantillyRooms: [],
    fairfaxRooms: getClassSchedule(state.fairfaxClassSchedule),
    chantillyRooms: getClassSchedule(state.chantillyClassSchedule),
  }
}

export default connect(mapStateToProps)(RoomSelect)
