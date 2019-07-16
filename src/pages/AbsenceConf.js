import React, { Component } from 'react'
import { Link, withRouter, setRouteLeaveHook } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import { clearAbsences } from '../redux/actions/AbsenceActions'
import { absenceChildrenPropTypes } from '../helpers/propTypes'
import { addAbsence } from '../redux/actions/DataActions'
import { turnToNormalTime } from '../helpers/timeHelpers'
import { getStudentFromList } from '../helpers/makeupHelpers'

class AbsenceConf extends Component {
  constructor(props) {
    super(props)

    this.state = {
      foundStudent: -1,
    }
  }

  componentDidMount() {
    const {
      children, dispatch, fairfaxStudents, chantillyStudents, history, router,
    } = this.props

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

    const students = children.map((child) => {
      const studentList = child.location === 'Fairfax' ? fairfaxStudents : chantillyStudents
      const {
        room, classTime, firstName, lastName,
      } = child
      return getStudentFromList(studentList, room, classTime, firstName, lastName)
    })

    axios
      .post('/api/postToSheets', {
        passedInData: childrenDateFormatted,
        spreadsheetId: process.env.ABSENCES_SHEET,
      })

    if (students) {
      this.setState({ foundStudent: 1 })

      students.forEach((student) => {
        axios.post('/api/sendConfirmation', {
          parentEmail: student.Email,
          subject: 'Absence Confirmation',
          text: 'Thanks for scheduling an absence!',
        })
      })
    } else {
      this.setState({ foundStudent: 0 })
      let text = ''
      children.forEach((child) => {
        text = `${`${text} First Name: ${child.firstName}\n Last Name: ${child.lastName}`}\n`
      })
      axios.post('/api/sendConfirmation', {
        parentEmail: process.env.GMAIL,
        subject: 'Error in absence submission',
        text,
      })
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(clearAbsences())
  }

  returnJSX = () => {
    const { foundStudent } = this.state

    if (foundStudent === -1) {
      return (
        <div className="container">
          <h3>Processing</h3>
        </div>
      )
    }

    if (foundStudent === 1) {
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

    return (
      <div className="container">
        <h3>ERROR</h3>
        <p>The student information entered does not match or exist in our database (name and/or ID number must be exactly as entered in our database). Please check name spelling and schedule submitted. If both are correct, please call or email US Arts.</p>
      </div>
    )
  }

  render() {
    return this.returnJSX()
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
