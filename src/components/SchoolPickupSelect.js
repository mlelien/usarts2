import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'
import { setSchoolPickup } from '../redux/actions/AbsenceActions'
import { hasFileBeenModified } from '../dataHelper'

class SchoolPickupSelect extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value,
      fairfaxSchools: [],
      chantillySchools: [],
    }
  }

  componentDidMount() {
    const fairfaxSchoolsData = JSON.parse(localStorage.getItem(process.env.SCHOOL_PICKUP_FAIRFAX))
    const chantillySchoolsData = JSON.parse(localStorage.getItem(process.env.SCHOOL_PICKUP_CHANTILLY))

    if (!fairfaxSchoolsData) {
      this.backendGetData(process.env.SCHOOL_PICKUP_FAIRFAX)
    } else if (fairfaxSchoolsData && process.env.NODE_ENV !== 'development' && hasFileBeenModified(fairfaxSchoolsData, process.env.SCHOOL_PICKUP_FAIRFAX)) {
      this.backendGetData(process.env.SCHOOL_PICKUP_FAIRFAX)
    } else {
      this.loadDataToState(fairfaxSchoolsData, process.env.SCHOOL_PICKUP_FAIRFAX)
    }

    if (!chantillySchoolsData) {
      this.backendGetData(process.env.SCHOOL_PICKUP_CHANTILLY)
    } else if (chantillySchoolsData && process.env.NODE_ENV !== 'development' && hasFileBeenModified(chantillySchoolsData, process.env.SCHOOL_PICKUP_CHANTILLY)) {
      this.backendGetData(process.env.SCHOOL_PICKUP_CHANTILLY)
    } else {
      this.loadDataToState(chantillySchoolsData, process.env.SCHOOL_PICKUP_CHANTILLY)
    }
  }

  loadDataToState = (data, spreadsheetId) => {
    const editedData = data.slice(1)

    const schools = editedData.map(school => school['School Name'])
    if (spreadsheetId === process.env.SCHOOL_PICKUP_FAIRFAX) {
      this.setState({ fairfaxSchools: schools })
    } else {
      this.setState({ chantillySchools: schools })
    }
  }

  backendGetData = (spreadsheetId) => {
    axios
      .get('/api/getFieldData', {
        params: {
          spreadsheetId,
        },
      })
      .then((res) => {
        this.loadDataToState(res.data)
        const serializedData = JSON.stringify(res.data)
        localStorage.setItem(spreadsheetId, serializedData)
      })
  }

  schoolPickupOptions = () => {
    const { location } = this.props
    const { fairfaxSchools, chantillySchools } = this.state

    return location === 'Fairfax'
      ? fairfaxSchools.map(school => <option key={school} value={school}>{school}</option>)
      : chantillySchools.map(school => <option key={school} value={school}>{school}</option>)
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
      <label className='input-group'>
        <span>School pickup (optional)</span>
        <span className='subtitle'>If your child usually gets picked up from school, please select the school here:</span>
        <select className='select' value={value} onChange={this.onChange}>
          <option>None</option>
          {this.schoolPickupOptions()}
        </select>
      </label>
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
}

const mapDispatchToProps = (state, props) => ({
  location: state[props.childIndex].location,
})

export default connect(mapDispatchToProps)(SchoolPickupSelect)
