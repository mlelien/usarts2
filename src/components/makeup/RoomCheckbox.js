import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { roomCheckboxToggle } from '../../redux/actions/MakeupActions'

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
        <div className="col-1">
          <input
            className='form-check-input'
            id={roomNumber}
            type='checkbox'
            name={roomNumber}
            key={roomNumber}
            onChange={this.onChange}
            checked={checkboxes[roomNumber - 1]}
          />
          <label htmlFor={roomNumber} className="form-check-label">
            {roomNumber}
          </label>
        </div>

      )

      return checkboxJSX
    })

    return roomsJSX
  }

  render() {
    return (
      <div>
        <label><b>Room #</b></label>
        <div className="form-check">
          <div className="row">
            {this.roomCheckboxes()}
          </div>
        </div>
      </div>
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
