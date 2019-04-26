import React from 'react'
import { NavLink } from 'react-router-dom'
import '../css/styles.css'

const AbsenceConf = () => (
  <div className="container">
    <div className="title">Absence Confirmation</div>
    <p> Thanks for submitting an absence! You should recieve an email confirmation soon.</p>
    <p> Not sure when you want to make up the class yet? Makeups can be scheduled at a later date. </p>
    <br />
    <br />
    <NavLink className='button-link' exact to='/makeup'>Schedule Makeup</NavLink>
  </div>
)

export default AbsenceConf
