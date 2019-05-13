import React, { Component } from 'react'
import '../css/Absence.css'
import '../css/styles.css'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import AbsenceForm from '../components/AbsenceForm'
import { setRepeatedAbsences, addChild, removeChild } from '../redux/actions/AbsenceActions'
import { SecondaryButton } from '../css/testtest'
import { absenceChildrenPropTypes, historyPropType } from '../helpers/propTypes'

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
`

const RowItem = styled.div`
  margin-right: 4rem;
  align-items: center;
`

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
          || lastName === '' || room === '' || classTime === '') { isFilled = false }
    })

    if (isFilled) history.push('/absence-pending')
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
            <SecondaryButton onClick={() => this.removeChildClicked(i)}>Remove Child</SecondaryButton>
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
      <div className="container">
        <div className="title">Mark an Absence</div>
        {this.showAbsenceForm()}
        <Row>
          <RowItem>
            <SecondaryButton onClick={this.onAddChildBtnClicked} type='button'>+ add child</SecondaryButton>
          </RowItem>
          <RowItem>
            <p>If your children attend class on different days, please fill out separate forms.</p>
          </RowItem>
        </Row>
        <Row>
          <label className='input-group'>
            <span>Repeated Absences (optional)</span>
            <input
              className='input'
              type='text'
              onChange={this.onRepeatedAbsencesChange}
            />
          </label>
        </Row>
        <button type='submit' onClick={this.onSubmit}>Submit Absence</button>

        <p><a href="/absence-pending">pending</a></p>
        <p><a href='/absence-confirmation'>confirmation</a></p>
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
