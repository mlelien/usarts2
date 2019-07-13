import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import { turnToNormalTime } from '../../helpers/timeHelpers'
import { addMakeup } from '../../redux/actions/DataActions'
import { clearMakeup } from '../../redux/actions/MakeupActions'


class MakeupConf extends Component {
  componentDidMount() {
    const {
      dispatch, fairfaxStudents, chantillyStudents, history, location: { makeup },
    } = this.props

    history.listen(this.onRouteChange)

    if (process.env.NODE_ENV !== 'development') {
      const {
        absenceLocation, absenceRoom, absenceTime, firstName, lastName,
      } = makeup
      const studentList = absenceLocation === 'Fairfax' ? fairfaxStudents : chantillyStudents

      const student = studentList.filter((studentObj, i) => {
        if (Object.entries(studentObj).length === 0 && studentObj.constructor === Object) return false

        return studentObj.ID.slice(0, 1) === 'G'
      && studentObj['Last Name'].toUpperCase() === lastName.toUpperCase()
      && studentObj['First Name'].toUpperCase() === firstName.toUpperCase()
      && turnToNormalTime(studentObj) === absenceTime
      && studentObj.Rm === absenceRoom
      })[0]

      axios
        .post('/api/sendConfirmation', {
          parentEmail: student.Email,
          subject: 'Makeup Confirmation',
          text: 'Thanks for scheduling a makeup!',
        })

      axios
        .post('/api/postToSheets', {
          passedInData: [{
            ...makeup,
            ID: student.ID,
            Crs: student.Crs,
          }],
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
        })
    }
  }

   onRouteChange = () => {
     const { dispatch } = this.props
     dispatch(clearMakeup())
   }

   render() {
     const { makeupLocation, makeupRoom, location: { makeup } } = this.props

     return (
       <div className='container'>
         <h3 className='mb-3'>Schedule a Makeup</h3>
         <p className='my-4'> Thanks for scheduling a makeup! An email confirmation has been sent. Here is an overview of information submitted:</p>
         <div className='row'>
           <div className="col-md-2 mb-3">Absence Date</div>
           <div className="col-md-2 mb-3"><b>{makeup.absenceDate}</b></div>
         </div>
         <div className='row'>
           <div className="col-md-2 mb-3">Makeup Date</div>
           <div className="col-md-2 mb-3"><b>{makeup.makeupDate}</b></div>
           <div className="col-md-2 mb-3">Makeup Time</div>
           <div className="col-md-2 mb-3"><b>{makeup.makeupTime}</b></div>
         </div>
         <div className='row'>
           <div className="col-md-2 mb-3">Last Name</div>
           <div className="col-md-2 mb-3"><b>{makeup.lastName}</b></div>
           <div className="col-md-2 mb-3">Location</div>
           <div className="col-md-2 mb-3"><b>{makeupLocation}</b></div>
         </div>
         <div className='row'>
           <div className="col-md-2 mb-3">First Name</div>
           <div className="col-md-2 mb-3"><b>{makeup.firstName}</b></div>
           <div className="col-md-2 mb-3">Room #</div>
           <div className="col-md-2 mb-3"><b>{makeupRoom}</b></div>
         </div>
         <Link to='/makeup'>
           <button type='button' className='my-5'>Schedule New Makeup</button>
         </Link>
       </div>
     )
   }
}

const mapStateToProps = state => ({
  makeupLocation: state.makeup.location,
  makeupRoom: state.makeup.room,
  fairfaxStudents: state.fairfaxStudents,
  chantillyStudents: state.chantillyStudents,
})

export default withRouter(connect(mapStateToProps)(MakeupConf))
