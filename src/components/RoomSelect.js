import React, { Component } from 'react'
import Tabletop from 'tabletop'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setRoom } from '../redux/actions/AbsenceActions'

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
    Tabletop.init({
      key: process.env.ROOM_FAIRFAX,
      callback: (data) => {
        const fairfaxRooms = data.map(room => room['Room No.'])
        this.setState({ fairfaxRooms })
      },
      simpleSheet: true,
    })

    Tabletop.init({
      key: process.env.ROOM_CHANTILLY,
      callback: (data) => {
        const chantillyRooms = data.map(room => room['Room No.'])
        this.setState({ chantillyRooms })
      },
      simpleSheet: true,
    })
  }

  roomOptions = () => {
    const { fairfaxRooms, chantillyRooms } = this.state
    const allRooms = Array.from(new Set([...fairfaxRooms, ...chantillyRooms]))

    return allRooms.map(room => <option key={room} value={room}>{room}</option>)
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
}

export default connect()(RoomSelect)
