/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-closing-tag-location */
import React from 'react'

const Main = () => (
  <div className='container'>
    <h4 className='mb-3'>Welcome to the USArts Absence/Makeup scheduler!</h4>
    <p>Please submit an absence request first before scheduling a makeup.</p>
    <div className="d-flex justify-content-start">
      <button type='button' className='mr-3' href='/absence'>Absence</button>
      <button type='button' href='/makeup'>Makeup</button>
    </div>
  </div>
)

export default Main
