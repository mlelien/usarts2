import React from 'react'
import { NavLink } from 'react-router-dom'
import './css/Navbar.css'

const Navbar = () => (
  <nav>
    <div className='nav-container'>
      <a className='nav-link' href='https://usartscenter.com/'>Main Website</a>
      <NavLink className='nav-link' exact to='/absence'>Mark Absence</NavLink>
      <NavLink className='nav-link' exact to='/makeup'>Schedule Makeup</NavLink>
    </div>
  </nav>
)

export default Navbar
