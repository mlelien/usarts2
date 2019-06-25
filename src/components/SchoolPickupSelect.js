import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setSchoolPickup } from '../redux/actions/AbsenceActions'

class SchoolPickupSelect extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value,
    }
  }

  schoolPickupOptions = () => {
    const { location, fairfaxSchools, chantillySchools } = this.props

    return location === 'Fairfax'
      ? fairfaxSchools.map(school => <option key={school['School Name']} value={school['School Name']}>{school['School Name']}</option>)
      : chantillySchools.map(school => <option key={school['School Name']} value={school['School Name']}>{school['School Name']}</option>)
  }

  onChange = (event) => {
    const { dispatch, childIndex } = this.props
    const { value } = event.target

    dispatch(setSchoolPickup(value, childIndex))
    this.setState({
      value,
    })
  }

  render() {
    const { value } = this.state

    return (
      <select className='form-control' value={value} onChange={this.onChange}>
        <option>None</option>
        {this.schoolPickupOptions()}
      </select>
    )
  }
}

SchoolPickupSelect.defaultProps = {
  value: '',
}

SchoolPickupSelect.propTypes = {
  dispatch: PropTypes.func.isRequired,
  value: PropTypes.string,
  childIndex: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  fairfaxSchools: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  chantillySchools: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
}

const mapDispatchToProps = (state, props) => ({
  location: state.absenceChildren[props.childIndex].location,
  fairfaxSchools: state.fairfaxSchools,
  chantillySchools: state.chantillySchools,
})

export default connect(mapDispatchToProps)(SchoolPickupSelect)
