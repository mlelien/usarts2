import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import '../css/styles.css'
import axios from 'axios'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { clearAbsences } from '../redux/actions/AbsenceActions'

class AbsenceConf extends Component {
  componentDidMount() {
    const { children, dispatch } = this.props

    const childrenDateFormatted = children.map((child) => {
      const date = child.date.format('l')
      return {
        ...child,
        date,
      }
    })

    axios
      .post('/api/getList', {
        childrenDateFormatted,
      })
      .then(() => {
        dispatch(clearAbsences())
      })
  }

  render() {
    return (
      <div className="container">
        <div className="title">Absence Confirmation</div>
        <p> Thanks for submitting an absence! You should recieve an email confirmation soon.</p>
        <p> Not sure when you want to make up the class yet? Makeups can be scheduled at a later date. </p>
        <br />
        <br />
        <NavLink className='button-link' exact to='/makeup'>Schedule Makeup</NavLink>
      </div>
    )
  }
}

AbsenceConf.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.shape({
    date: PropTypes.object.isRequired,
    location: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    studentID: PropTypes.string,
    room: PropTypes.string.isRequired,
    classTime: PropTypes.string.isRequired,
    schoolPickup: PropTypes.string,
    repeatedAbsences: PropTypes.string,
  }).isRequired,
}

const mapDispatchToProps = state => ({
  children: state,
})

export default connect(mapDispatchToProps)(AbsenceConf)
