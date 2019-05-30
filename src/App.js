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
import { startGetAllData } from './redux/actions/DataActions'
import Main from './pages/Main'
import MakeupContinued from './pages/MakeupContinued'
import MakeupConf from './components/makeup/MakeupConf'
import { clearMakeup } from './redux/actions/MakeupActions'

const markup = (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Header />
        <Navbar />
        <Switch>
          <Route exact path='/' render={() => <Main />} />
          <Route exact path='/absence' render={() => <Absence />} />
          <Route exact path='/absence-confirmation' render={() => <AbsenceConf />} />
          <Route exact path='/absence-pending' render={() => <AbsencePending />} />
          <Route exact path='/makeup' render={() => <Makeup />} />
          <Route exact path='/makeup-continued' render={() => <MakeupContinued />} />
          <Route exact path='/makeup-conf' onLeave={() => { console.log('onleave'); store.dispatch(clearMakeup()) }} render={() => <MakeupConf />} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(
  <div className='loading-container'>
    <div className='vertical-container'>
      <h1 className='loading'>Loading</h1>
      <img src='./img/loading.svg' alt='Loading' />
    </div>
  </div>,
  document.querySelector('#root'),
)

store.dispatch(startGetAllData())
  .then(() => {
    ReactDOM.render(markup, document.querySelector('#root'))
  })
