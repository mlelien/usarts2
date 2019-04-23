import React from 'react'
import '../css/styles.css'
import '../css/AbsencePending.css'

const AbsencePending = () => (
  <div className="container">
    <div className="title">Absence Pending</div>
    <p> Please review the following absence information: </p>
    <div className='row-1'>
      <p className='prompt'>Absence Date</p>
      <p className='answer'>Wed, Mar 18</p>
    </div>
    <div className='row-1'>
      <p className='prompt'>Location</p>
      <p className='answer'>Fairfax</p>
    </div>
    <div className='row-2'>
        <p className='prompt'>Last Name</p>
        <p className='answer'>Yang</p>
        <p className='prompt'>Class Time</p>
        <p className='answer'>1:30pm</p>
    </div>
    <div className='row-2'>
        <p className='prompt'>First Name</p>
        <p className='answer'>Yang</p>
        <p className='prompt'>Room #</p>
        <p className='answer'>5</p>
    </div>
    <div className='row-2'>
        <p className='prompt'>Student ID (optional)</p>
        {/* <p className='answer'>Yang</p> */}
        <p className='prompt'>School pickup (optional)</p>
        {/* <p className='answer'>5</p> */}
    </div>
    <div className='row-1'>
      <p className='prompt'>Repeated Absence (optional)</p>
      {/* <p className='answer'>Wed, Mar 18</p> */}
    </div>
    <button type='button'>Edit</button>
    <button type='submit'>Confirm</button>
  </div>

)

export default AbsencePending
