import React, { Component } from 'react'
import '../css/styles.css'
import '../css/AbsencePending.css'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import AbsencePendingDisplay from '../components/AbsencePendingDisplay'
import { absenceChildrenPropTypes, historyPropType } from '../helpers/propTypes'
import { addChild } from '../redux/actions/AbsenceActions'

class AbsencePending extends Component {
  onEditBtnClicked = (event) => {
    event.preventDefault()
    const { history } = this.props

    history.goBack()
  }

  onCofirmBtnClicked = (event) => {
    event.preventDefault()
    const { history } = this.props

    history.push('/absence-confirmation')
  }

  showAbsencePendingPerChild = () => {
    const { children } = this.props

    return children.map(child => <AbsencePendingDisplay key={child.firstName + child.lastName + child.studentID} {...child} />)
  }

  render() {
    return (
      <div className="container">
        <div className="title">Absence Pending</div>
        <p> Please review the following absence information: </p>
        {this.showAbsencePendingPerChild()}
        <button type='button' onClick={this.onEditBtnClicked}>Edit</button>
        <button type='submit' onClick={this.onCofirmBtnClicked}>Confirm</button>
      </div>
    )
  }
}

AbsencePending.propTypes = {
  history: historyPropType.isRequired,
  children: absenceChildrenPropTypes.isRequired,
  dispatch: PropTypes.func.isRequired,
}


const mapStateToProps = state => ({
  children: state.absenceChildren,
})

export default withRouter(connect(mapStateToProps)(AbsencePending))
