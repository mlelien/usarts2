import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { roomCheckboxToggle } from '../../redux/actions/MakeupActions'
import '../../css/Checkbox.css'

class RoomCheckbox extends Component {
  onChange = (event) => {
    const { dispatch } = this.props
    dispatch(roomCheckboxToggle(!event.target.checked, Number(event.target.name) - 1))
  }

  roomCheckboxes = () => {
    const {
      location, fairfaxRooms, chantillyRooms, checkboxes,
    } = this.props

    const rooms = location === 'Fairfax' ? fairfaxRooms : chantillyRooms

    const roomsJSX = rooms.map((roomObj) => {
      const roomNumber = roomObj['Room No.']

      const checkboxJSX = (
        <li key={roomNumber}>
          <label className='checkbox-label'>
            <input
              type='checkbox'
              name={roomNumber}
              key={roomNumber}
              onChange={this.onChange}
              checked={checkboxes[roomNumber - 1]}
            />
            {roomNumber}
          </label>
        </li>
      )

      return checkboxJSX
    })

    return roomsJSX
  }

  render() {
    return (
      <label className='input-group'>
        <span>Room #(s):</span>
        <ul>
          {this.roomCheckboxes()}
        </ul>
      </label>
    )
  }
}

RoomCheckbox.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  fairfaxRooms: state.fairfaxRooms,
  chantillyRooms: state.chantillyRooms,
  location: state.makeup.location,
  checkboxes: state.makeup.roomsCheckboxes,
})

export default connect(mapStateToProps)(RoomCheckbox)
