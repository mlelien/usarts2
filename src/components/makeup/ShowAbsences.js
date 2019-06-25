import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Link, withRouter } from 'react-router-dom'
import { weekDayToNumber } from '../../helpers/timeHelpers'
import axios from 'axios'


class ShowAbsences extends Component {
  constructor(props) {
    super(props)

    this.state = {
      makeupClicked: false,
      hasAbsence: false,
      matches: [],
      selectedIndex: -1,
    }
  }

  onShowAbsenceClick = (e) => {
    const {
      absences, location, day, time, room, firstName, lastName,
    } = this.props

    const matches = []
    absences.forEach((absence) => {
      const dayNum = moment(absence['Absence Date']).day()
      const absenceLocation = absence['Location'] // eslint-disable-line dot-notation
      const lastName = absence['Last Name']

      if (dayNum === weekDayToNumber(day)
        && absence.Location === location
        && absence['Last Name'].toLowerCase() === lastName.toLowerCase()
        && absence['First Name'].toLowerCase() === firstName.toLowerCase()
        && absence['Room #'] === room
        && absence['Class Time'] === time) {
        matches.push(absence)
      }
    })

    this.setState({
      makeupClicked: true,
      hasAbsence: matches.length > 0,
      matches,
    })
  }

  noAbsenceJSX = () => (
    <div>
      <p>Sorry! It looks like there aren't any absences under that name. Please fill out an absence form first.</p>
      <button type='button' className='my-4 mr-3' onClick={this.onShowAbsenceClick}>Recheck</button>
      <Link to='/absence'>
        <button type='button'>Absence Form</button>
      </Link>
    </div>
  )

  onSubmitMakeup = (event) => {
    event.preventDefault()
    const { makeupDate, makeupTime, history } = this.props
    const { matches, selectedIndex } = this.state
    const makeup = matches[selectedIndex]
console.log(this.props);
    const passedInData = {
      makeupDate,
      makeupTime,
      firstName: makeup['First Name'],
      lastName: makeup['Last Name'],
      absenceDate: makeup['Absence Date'],
      absenceLocation: makeup['Location'], //eslint-disable-line
      absenceTime: makeup['Class Time'],
      absenceRoom: makeup['Room #'],
    }

    history.push({
      pathname: '/makeup-conf',
      makeup: passedInData,
    })
    // axios
    //   .post('/api/postToSheets', {
    //     passedInData,
    //     spreadsheetId: process.env.MAKEUPS_SHEET,
    //   })
    //   .then(() => {
    //     history.push('/makeup-conf')
    //   })
  }

  hasAbsenceJSX = () => {
    console.log('hasAbsenceJSX');
    const { makeupDate, makeupTime } = this.props
    const { matches, selectedIndex } = this.state
    const selectedMakeup = matches[selectedIndex]

    const makeup = selectedMakeup && {
      makeupDate,
      makeupTime,
      firstName: matches[selectedIndex]['First Name'],
      lastName: matches[selectedIndex]['Last Name'],
      absenceDate: matches[selectedIndex]['Absence Date'],
      absenceLocation: matches[selectedIndex]['Location'], //eslint-disable-line
      absenceTime: matches[selectedIndex]['Class Time'],
      absenceRoom: matches[selectedIndex]['Room #'],
    }

    return (
      <div>
        <p className='mt-5 text-primary'><b>Select the absence you want to make up for</b></p>
        <table className='table col-3'>
          <thead className="thead-light">
            <tr>
              <th scope='col'>Absence Date</th>
              <th scope='col'>Makeup</th>
            </tr>
          </thead>
          {matches.map((absence, i) => (
            <tr>
              <td className='show-absence-td'>
                {moment(absence['Absence Date']).format('ddd, MMM D')}
              </td>
              <td className='show-absence-td-input '>
                <input
                  type='radio'
                  value={i}
                  checked={i === selectedIndex}
                  onChange={() => { this.setState({ selectedIndex: i }) }}
                />
              </td>
            </tr>
          ))}
        </table>
        <button type='submit' className='mb-5' onClick={this.onSubmitMakeup}>Schedule Makeup</button>
      </div>
    )
  }

  render() {
    const { makeupDate, makeupTime, history } = this.props
    const {
      makeupClicked, hasAbsence, matches, selectedIndex,
    } = this.state

    return (
      makeupClicked ? (
        hasAbsence ? this.hasAbsenceJSX() : this.noAbsenceJSX()
      ) : (
        <button type='button' className='my-4' onClick={this.onShowAbsenceClick}>Show absences</button>
      )

    )
  }
}

const mapStateToProps = state => ({
  absences: state.absences,
  firstName: state.makeup.firstName,
  lastName: state.makeup.lastName,
  location: state.makeup.lookupAbsenceLocation,
  day: state.makeup.lookupAbsenceDay,
  time: state.makeup.lookupAbsenceTime,
  room: state.makeup.lookupAbsenceRoom,
})

export default withRouter(connect(mapStateToProps)(ShowAbsences))
