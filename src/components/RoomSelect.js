import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setRoom } from '../redux/actions/AbsenceActions'

class RoomSelect extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value,
    }
  }

  roomOptions = () => {
    const { location, fairfaxRooms, chantillyRooms } = this.props
    console.log(fairfaxRooms)
    const roomsJSX = location === 'Fairfax'
      ? fairfaxRooms.map(room => <option key={room['Room No.']} value={room['Room No.']}>{room['Room No.']}</option>)
      : chantillyRooms.map(room => <option key={room['Room No.']} value={room['Room No.']}>{room['Room No.']}</option>)

    return roomsJSX
  }

  onChange = (event) => {
    const { dispatch, childIndex } = this.props
    const { value } = event.target

    dispatch(setRoom(value, childIndex))
    this.setState({
      value,
    })
  }

  render() {
    const { value } = this.state
    return (
      <label className='input-group'>
        <span>Room #</span>
        <select className='select' value={value} onChange={this.onChange}>
          {this.roomOptions()}
        </select>
      </label>
    )
  }
}

RoomSelect.defaultProps = {
  value: '',
}

RoomSelect.propTypes = {
  dispatch: PropTypes.func.isRequired,
  value: PropTypes.string,
  childIndex: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  fairfaxRooms: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  chantillyRooms: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
}

const mapDispatchToProps = (state, props) => ({
  location: state.absenceChildren[props.childIndex].location,
  fairfaxRooms: state.fairfaxRooms,
  chantillyRooms: state.chantillyRooms,
})

export default connect(mapDispatchToProps)(RoomSelect)
