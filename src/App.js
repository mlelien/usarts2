import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Header from './Header'
import './css/App.css'
import Navbar from './Navbar'
import Absence from './pages/Absence'
import Makeup from './pages/Makeup'

const markup = (
  <BrowserRouter>
    <div>
      <Header />
      <Navbar />
      <Switch>
        <Route exact path='/absence' render={() => <Absence />} />
        <Route exact path='/makeup' render={() => <Makeup />} />
      </Switch>
    </div>
  </BrowserRouter>
)

ReactDOM.render(markup, document.querySelector('#root'))
