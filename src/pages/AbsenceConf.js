import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import '../css/styles.css'
import axios from 'axios'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import { clearAbsences } from '../redux/actions/AbsenceActions'
import { absenceChildrenPropTypes } from '../helpers/propTypes'
import { startGetAbsences, addAbsence } from '../redux/actions/DataActions'

class AbsenceConf extends Component {
  componentDidMount() {
    const { children, dispatch, absences } = this.props

    const childrenDateFormatted = children.map((child) => {
      dispatch(addAbsence({
        'Absence Date': moment(child.date).format('l'),
        'Location': child.location, //eslint-disable-line
        'Last Name': child.lastName,
        'First Name': child.firstName,
        'Student ID': child.studentID,
        'Room #': child.room,
        'Class Time': child.classTime,
        'School Pickup': child.schoolPickup,
      }))

      const date = child.date.format('l')
      return {
        ...child,
        date,
      }
    })

    axios
      .post('/api/postToSheets', {
        passedInData: childrenDateFormatted,
        spreadsheetId: process.env.ABSENCES_SHEET,
      })
      .then(() => {
        dispatch(clearAbsences())
      })
  }

  render() {
    return (
      <div className="container">
        <div className="title">Absence Confirmation</div>
        <p> Thanks for submitting an absence! You should recieve an email confirmation soon.</p>
        <p> Not sure when you want to make up the class yet? Makeups can be scheduled at a later date. </p>
        <br />
        <br />
        <NavLink className='button-link' exact to='/makeup'>Schedule Makeup</NavLink>
      </div>
    )
  }
}

AbsenceConf.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: absenceChildrenPropTypes.isRequired,
}

const mapStateToProps = state => ({
  children: state.absenceChildren,
  absences: state.absences,
})

export default connect(mapStateToProps)(AbsenceConf)
