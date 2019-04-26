import React, { Component } from 'react'
import '../css/styles.css'
import '../css/AbsencePending.css'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { history as historyPropTypes } from 'history-prop-types'
import { withRouter } from 'react-router-dom'
import AbsencePendingDisplay from '../components/AbsencePendingDisplay'

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

    return children.map((child, i) => <AbsencePendingDisplay key={i} {...child} />)
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

const mapDispatchToProps = state => ({
  children: state,
})

AbsencePending.propTypes = {
  history: PropTypes.shape({
    historyPropTypes,
  }).isRequired,
}

export default withRouter(connect(mapDispatchToProps)(AbsencePending))
