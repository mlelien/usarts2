import React from 'react'

const Header = () => (
  <header>
    <div className="container my-4 d-flex justify-content-between">
      <a href="/">
        <img className='header-img' src='./img/logo.png' alt='US Arts Logo' />
      </a>
      <div>
        <p>Chantilly (703) 956-6186</p>
        <p>Fairfax (703) 822-7766</p>
      </div>
    </div>
  </header>
)

export default Header
