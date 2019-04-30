import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import { setRoom } from '../redux/actions/AbsenceActions'
import { hasFileBeenModified } from '../dataHelper'

class RoomSelect extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value,
      fairfaxRooms: [],
      chantillyRooms: [],
    }
  }

  componentDidMount() {
    const fairfaxRoomsData = JSON.parse(localStorage.getItem(process.env.ROOM_FAIRFAX))
    const chantillyRoomsData = JSON.parse(localStorage.getItem(process.env.ROOM_CHANTILLY))

    if (!fairfaxRoomsData) {
      this.backendGetData(process.env.ROOM_FAIRFAX)
    } else if (fairfaxRoomsData && process.env.NODE_ENV !== 'development' && hasFileBeenModified(fairfaxRoomsData, process.env.ROOM_FAIRFAX)) {
      this.backendGetData(process.env.ROOM_FAIRFAX)
    } else {
      this.loadDataToState(fairfaxRoomsData, process.env.ROOM_FAIRFAX)
    }

    if (!chantillyRoomsData) {
      this.backendGetData(process.env.ROOM_CHANTILY)
    } else if (chantillyRoomsData && process.env.NODE_ENV !== 'development' && hasFileBeenModified(chantillyRoomsData, process.env.ROOM_CHANTILLY)) {
      this.backendGetData(process.env.ROOM_CHANTILY)
    } else {
      this.loadDataToState(chantillyRoomsData, process.env.ROOM_CHANTILLY)
    }
  }

  loadDataToState = (data, spreadsheetId) => {
    const editedData = data.slice(1)
    const rooms = editedData.map(room => room['Room No.'])

    if (spreadsheetId === process.env.ROOM_FAIRFAX) {
      this.setState({ fairfaxRooms: rooms })
    } else {
      this.setState({ chantillyRooms: rooms })
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

  roomOptions = () => {
    const { location } = this.props
    const { fairfaxRooms, chantillyRooms } = this.state

    const roomsJSX = location === 'Fairfax'
      ? fairfaxRooms.map(room => <option key={room} value={room}>{room}</option>)
      : chantillyRooms.map(room => <option key={room} value={room}>{room}</option>)

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
}

const mapDispatchToProps = (state, props) => ({
  location: state[props.childIndex].location,
})

export default connect(mapDispatchToProps)(RoomSelect)
