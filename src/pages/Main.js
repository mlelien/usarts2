/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-closing-tag-location */
import React from 'react'
import { Link } from 'react-router-dom'

const Main = () => (
  <div className='container'>
    <h4 className='mb-3'>Welcome to the USArts Absence/Makeup scheduler!</h4>
    <p>Please submit an absence request first before scheduling a makeup.</p>
    <div className="d-flex justify-content-start">
      <Link to='/absence'>
        <button type='button' className='mr-3'>Absence</button>
      </Link>
      <Link to='/makeup'>
        <button type='button'>Makeup</button>
      </Link>
    </div>
  </div>
)

export default Main
