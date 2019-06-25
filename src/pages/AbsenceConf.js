import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import { clearAbsences } from '../redux/actions/AbsenceActions'
import { absenceChildrenPropTypes } from '../helpers/propTypes'
import { addAbsence } from '../redux/actions/DataActions'
import { turnToNormalTime } from '../helpers/timeHelpers'

class AbsenceConf extends Component {
  componentDidMount() {
    const {
      children, dispatch, fairfaxStudents, chantillyStudents, history,
    } = this.props

    history.listen(this.onRouteChange)

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

    const firstChild = children[0]
    const studentList = firstChild.location === 'Fairfax' ? fairfaxStudents : chantillyStudents

    const student = studentList.filter((studentObj) => {
      if (Object.entries(studentObj).length === 0 && studentObj.constructor === Object) return false

      return studentObj.ID.slice(0, 1) === 'G'
    && studentObj['Last Name'].toUpperCase() === firstChild.lastName.toUpperCase()
    && studentObj['First Name'].toUpperCase() === firstChild.firstName.toUpperCase()
    && turnToNormalTime(studentObj) === firstChild.classTime
    && studentObj.Rm === firstChild.room
    })[0]

    axios
      .post('/api/postToSheets', {
        passedInData: childrenDateFormatted,
        spreadsheetId: process.env.ABSENCES_SHEET,
      })

    axios.post('/api/sendConfirmation', {
      parentEmail: student.Email,
      subject: 'Absence Confirmation',
      text: 'Thanks for scheduling an absence!',
    })
  }

  onRouteChange = () => {
    const { dispatch } = this.props
    dispatch(clearAbsences())
  }

  render() {
    return (
      <div className="container">
        <h3>Absence Confirmation</h3>
        <p> Thanks for submitting an absence! You should recieve an email confirmation soon.</p>
        <p> Not sure when you want to make up the class yet? Makeups can be scheduled at a later date. </p>
        <br />
        <br />
        <button type='button' className='m-auto'>
          <Link className='text-white' exact to='/makeup'>Schedule Makeup</Link>
        </button>
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
  fairfaxStudents: state.fairfaxStudents,
  chantillyStudents: state.chantillyStudents,
})

export default withRouter(connect(mapStateToProps)(AbsenceConf))
