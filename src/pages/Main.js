/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-closing-tag-location */
import React, { Component } from 'react'
import '../css/styles.css'
import '../css/Makeup.css'

const doGrid = () => {
  const numCol = 3
  const numRow = 2
  const colStyle = `repeat(${numCol}, 1fr)`
  const rowStyle = `repeat(${numRow}, 1fr)`
  const style = {
    gridTemplateColumns: colStyle,
  }

  return (
    <table>
      <tr>
        <td />
        <th><p>Room 1</p></th>
        <th><p>Room 2</p></th>
        <th><p>Room 3</p></th>
        <th><p>Room 4</p></th>
        <th><p>Room 5</p></th>
      </tr>
      <tr>
        <th>4:30 PM</th>
        <td><button type='button'>10 spots</button></td>
        <td><button type='button'>10 spots</button></td>
        <td><button type='button'>12 spots</button></td>
        <td><button type='button'>12 spots</button></td>
        <td><button type='button'>14 spots</button></td>
      </tr>
      <tr>
        <th>6:30 PM</th>
        <td><button type='button'>14 spots</button></td>
        <td><button type='button'>15 spots</button></td>
        <td><button type='button'>15 spots</button></td>
        <td><button type='button'>16 spots</button></td>
        <td><button type='button'>16 spots</button></td>
      </tr>
    </table>
  )
}

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

    {doGrid()}

  </div>
)

export default Main
