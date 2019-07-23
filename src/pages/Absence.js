/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import AbsenceForm from '../components/AbsenceForm'
import { setRepeatedAbsences, addChild, removeChild } from '../redux/actions/AbsenceActions'
import { absenceChildrenPropTypes, historyPropType } from '../helpers/propTypes'

class Absence extends Component {
  onSubmit = (event) => {
    event.preventDefault()
    const { history, absenceChildren } = this.props
    let isFilled = true

    absenceChildren.forEach((absenceObj) => {
      const {
        date, location, lastName, firstName, room, classTime,
      } = absenceObj

      if (date === null || location === '' || firstName === ''
          || lastName === '' || room === '' || classTime === '') {
        isFilled = false
      }
    })

    if (isFilled) {
      history.push('/absence-pending')
    }
  }

  onAddChildBtnClicked = () => {
    const { dispatch, absenceChildren } = this.props

    if (absenceChildren.length < 4) {
      dispatch(addChild())
    }
  }

  removeChildClicked = (childIndex) => {
    const { dispatch } = this.props
    dispatch(removeChild(childIndex))
  }

  showAbsenceForm = () => {
    const { absenceChildren } = this.props
    const forms = []
    for (let i = 0; i < absenceChildren.length; i++) {
      const jsx = i === 0 ? (<AbsenceForm key={i} childIndex={i} />)
        : (
          <div key={i}>
            <AbsenceForm childIndex={i} />
            <button className='secondary-button' type='button' onClick={() => this.removeChildClicked(i)}>Remove Child</button>
          </div>
        )

      forms.push(jsx)
    }
    return forms
  }

  onRepeatedAbsencesChange = (event) => {
    const { dispatch, absenceChildren } = this.props

    for (let i = 0; i < absenceChildren.length; i++) {
      dispatch(setRepeatedAbsences(event.target.value, i))
    }
  }

  render() {
    // TODO: forgot text at the end about making up absences

    return (
      <div className="container mb-4">
        <h3 className='mb-3'>Mark an Absence</h3>
        {this.showAbsenceForm()}
        <div className='row my-4'>
          <div className='col'>
            <button className='secondary-button' onClick={this.onAddChildBtnClicked} type='button'>+ add child</button>
          </div>
        </div>
        <div className='row'>
          <div className='form-group col mb-5'>
            <label htmlFor="repeatedAbsences" className='mb-0'>Repeated Absences (optional)</label>
            <small className="form-text text-muted mb-1">If this will be a repeated absence, please let us know the number of classes following <u>not</u> including the date selected above.</small>
            <input
              id='repeatedAbsences'
              className='form-control col-md-1'
              type='text'
              onChange={this.onRepeatedAbsencesChange}
            />
          </div>
        </div>
        <button type='submit' onClick={this.onSubmit}>Submit Absence</button>
      </div>
    )
  }
}

Absence.propTypes = {
  history: historyPropType.isRequired,
  dispatch: PropTypes.func.isRequired,
  absenceChildren: absenceChildrenPropTypes.isRequired,
}

const mapStateToProps = state => ({
  absenceChildren: state.absenceChildren,
})

export default withRouter(connect(mapStateToProps)(Absence))
