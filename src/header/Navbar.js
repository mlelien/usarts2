import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => (
  <div className="bg-light my-3">
    <div className="container">
      <nav className='navbar navbar-expand-md navbar-light'>
        <button className="navbar-toggler" type='button' data-toggle='collapse' data-target='#navbar' aria-controls='navbar' aria-expanded='false' aria-label='Toggle navigation'>
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse justify-content-between" id='navbar'>
          <NavLink className='nav-item nav-link' exact to='/absence'>Mark Absence</NavLink>
          <NavLink className='nav-item nav-link' exact to='/makeup'>Schedule makeup</NavLink>
          <a className='nav-item nav-link' href='https://usartscenter.com/'>Main Website</a>
        </div>
      </nav>
    </div>
  </div>
)

export default Navbar
