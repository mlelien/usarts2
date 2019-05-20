/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-closing-tag-location */
import React from 'react'
import '../css/styles.css'

const Main = () => (
  <div className="container">
    <div className="title"> Welcome to the USArts Absence/Makeup scheduler!</div>
    <p>Please submit an absence request first before scheduling a makeup. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
        ea commodo consequat
    </p>

    <div className="row">
      <div className="column"><a className="buttonLink" href='/absence'>Absence</a></div>
      <div className="column"><a className="buttonLink" href='/makeup'>Makeup</a></div>
    </div>
  </div>
)

export default Main
