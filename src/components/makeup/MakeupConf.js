import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import { Row, RowItem } from '../../css/testtest'
import '../../css/AbsencePending.css'
import { clearMakeup } from '../../redux/actions/MakeupActions'
import { addMakeup } from '../../redux/actions/DataActions'


class MakeupConf extends Component {
  componentDidMount() {
    const { dispatch, location: { state: { makeup } } } = this.props

    if (process.env.NODE_ENV !== 'development') {
      axios
        .post('/api/postToSheets', {
          passedInData: [makeup],
          spreadsheetId: process.env.MAKEUPS_SHEET,
        })
        .then(() => {
          dispatch(addMakeup({
            'Makeup Date': makeup.makeupDate,
            'Makeup Time': makeup.makeupTime,
            'First Name': makeup.firstName,
            'Last Name': makeup.lastName,
            'Absence Date': makeup.absenceDate,
            'Absence Location': makeup.absenceLocation,
            'Absence Time': makeup.absenceTime,
            'Absence Room': makeup.absenceRoom,
          }))
          dispatch(clearMakeup())
        })
    }
  }

  render() {
    const { makeupLocation, makeupRoom, location: { state: { makeup } } } = this.props

    return (
      <div className="container">
        <div className="title">Makeup Confirmation</div>
        <p> Thanks for scheduling a makeup! An email confirmation has been sent. Here is an overview of information submitted:</p>
        <div className='row-1'>
          <p className='prompt'>Absence Date</p>
          <p className='answer'>{makeup.absenceDate}</p>
        </div>
        <div className='row-2'>
          <p className='prompt'>Makeup Date</p>
          <p className='answer'>{makeup.makeupDate}</p>
          <p className='prompt'>Makeup Time</p>
          <p className='answer'>{makeup.makeupTime}</p>
        </div>
        <div className='row-2'>
          <p className='prompt'>Last Name</p>
          <p className='answer'>{makeup.lastName}</p>
          <p className='prompt'>Location</p>
          <p className='answer'>{makeupLocation}</p>
        </div>
        <div className='row-2'>
          <p className='prompt'>First Name</p>
          <p className='answer'>{makeup.firstName}</p>
          <p className='prompt'>Room #</p>
          <p className='answer'>{makeupRoom}</p>
        </div>
        <Link to='/makeup'>
          <button>Schedule New Makeup</button>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  makeupLocation: state.makeup.location,
  makeupRoom: state.makeup.room,
})

export default withRouter(connect(mapStateToProps)(MakeupConf))
