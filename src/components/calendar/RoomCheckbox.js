import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import { setRoom } from '../../redux/actions/AbsenceActions'
import { hasFileBeenModified } from '../../helpers/dataHelpers'
import { roomCheckboxToggle } from '../../redux/actions/MakeupActions'

class RoomCheckbox extends Component {
  constructor(props) {
    super(props)

    this.state = {
      checked: 1,
    }
  }

  onChange = (event) => {
    const { dispatch } = this.props
    dispatch(roomCheckboxToggle(true, 'Fairfax', 3))
  }

  roomCheckboxes = () => {
    const { location, fairfaxRooms, chantillyRooms } = this.props
    const { checked } = this.state

    const roomsJSX = location === 'Fairfax'
      ? fairfaxRooms.map(roomObj => (
        <label>
          <input
            type='checkbox'
            name={roomObj['Room No.']}
            key={roomObj['Room No.']}
            onChange={this.onChange}
            checked
          />
          {roomObj['Room No.']}
        </label>
      ))
      : chantillyRooms.map(roomObj => (
        <label>
          <input
            type='checkbox'
            name={roomObj['Room No.']}
            key={roomObj['Room No.']}
            onChange={this.onChange}
            checked
          />
          {roomObj['Room No.']}
        </label>
      ))

    return roomsJSX
  }

  render() {
    return (
      <label className='input-group'>
        <span>Room #</span>
        {this.roomCheckboxes()}
      </label>
    )
  }
}

RoomCheckbox.defaultProps = {
  checked: '',
}

const mapDispatchToProps = state => ({
  fairfaxRooms: state.fairfaxRooms,
  chantillyRooms: state.chantillyRooms,
})

export default connect(mapDispatchToProps)(RoomCheckbox)
