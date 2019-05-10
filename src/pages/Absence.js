import React, { Component } from 'react'
import '../css/Absence.css'
import '../css/styles.css'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { history as historyPropTypes } from 'history-prop-types'
import AbsenceForm from '../components/AbsenceForm'
import { setRepeatedAbsences, addChild } from '../redux/actions/AbsenceActions'

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
`

const RowItem = styled.div`
  margin-right: 4rem;
  align-items: center;
`

const AddChildButton = styled.button`
  color: #D12F24;
  background: #D8D8D8;
  border: none;
  border-radius: 3px;
  height: 3.5rem;
  width: 12rem;
  font-size: 1.4rem;
  margin: 0;
`

class Absence extends Component {
  constructor(props) {
    super(props)

    this.state = {
      numChildren: props.numChildren,
    }
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { history } = this.props

    // TODO: make sure all req fields are filled
    // if (firstName !== '' && lastName !== '') {
    history.push('/absence-pending')
    // }
  }

  onAddChildBtnClicked = () => {
    const { numChildren } = this.state
    const { dispatch } = this.props

    if (numChildren < 4) {
      dispatch(addChild())

      this.setState(prevState => ({
        numChildren: prevState.numChildren + 1,
      }))
    }
  }

  showAbsenceForm = () => {
    const { numChildren } = this.state
    const forms = []
    for (let i = 0; i < numChildren; i++) { forms.push(<AbsenceForm key={i} childIndex={i} />) }
    return forms
  }

  onRepeatedAbsencesChange = (event) => {
    const { dispatch } = this.props
    const { numChildren } = this.state
    const { value } = event.target

    for (let i = 0; i < numChildren; i++) {
      dispatch(setRepeatedAbsences(value, i))
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
            <AddChildButton onClick={this.onAddChildBtnClicked} type='button'>+ add child</AddChildButton>
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
  history: PropTypes.shape({
    historyPropTypes,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  numChildren: PropTypes.number.isRequired,
}

const mapDispatchToProps = state => ({
  numChildren: state.absenceChildren.length,
})

export default withRouter(connect(mapDispatchToProps)(Absence))
