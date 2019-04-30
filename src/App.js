import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/configureStore'

import Header from './header/Header'
import './css/App.css'
import Navbar from './header/Navbar'
import Absence from './pages/Absence'
import AbsenceConf from './pages/AbsenceConf'
import AbsencePending from './pages/AbsencePending'
import Makeup from './pages/Makeup'

const markup = (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Header />
        <Navbar />
        <Switch>
          <Route exact path='/absence' render={() => <Absence />} />
          <Route exact path='/absence-confirmation' render={() => <AbsenceConf />} />
          <Route exact path='/absence-pending' render={() => <AbsencePending />} />
          <Route exact path='/makeup' render={() => <Makeup />} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(markup, document.querySelector('#root'))
