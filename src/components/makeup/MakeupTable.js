import React, { Component } from 'react'

class MakeupTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showRooms: [],
      times: [],
      availabilityBtns: [],
    }
  }

  getAvailabilityCount = (roomObj, month, day) => {
    const { fairfax, absences } = this.props
    const { roomNumber } = roomObj

    const max = fairfax.rooms[roomNumber]
    let absenceCount = 0

    if (absences[month] && absences[month][day]) {
      absenceCount = absences[month][day]
    }

    return max - absenceCount
  }

  render() {
    const { showRooms } = this.state
    return (
      <table>
        <thead>
          <tr>
            <th />
            {showRooms}
          </tr>
        </thead>
        <tbody>
          {this.showAvailabilityRows()}
        </tbody>
      </table>
    )
  }
}

export default MakeupTable
