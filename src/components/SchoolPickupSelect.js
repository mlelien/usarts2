import React, { Component } from 'react'
import Tabletop from 'tabletop'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setSchoolPickup } from '../redux/actions/AbsenceActions'

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
    Tabletop.init({
      key: process.env.SCHOOL_PICKUP_FAIRFAX,
      callback: (data) => {
        const fairfaxSchools = data.map(school => school['School Name'])
        this.setState({ fairfaxSchools })
      },
      simpleSheet: true,
    })

    Tabletop.init({
      key: process.env.SCHOOL_PICKUP_CHANTILLY,
      callback: (data) => {
        const chantillySchools = data.map(school => school['School Name'])
        this.setState({ chantillySchools })
      },
      simpleSheet: true,
    })
  }

  schoolPickupOptions = () => {
    const { fairfaxSchools, chantillySchools } = this.state
    const allSchools = Array.from(new Set([...fairfaxSchools, ...chantillySchools]))

    return allSchools.map(school => <option key={school} value={school}>{school}</option>)
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
}


export default connect()(SchoolPickupSelect)
