import PropTypes from 'prop-types'
import { history } from 'history-prop-types'

export const historyPropType = PropTypes.shape({
  history,
})

export const childPropType = PropTypes.shape({
  date: PropTypes.object,
  location: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  studentID: PropTypes.string,
  room: PropTypes.string.isRequired,
  classTime: PropTypes.string.isRequired,
  schoolPickup: PropTypes.string,
  repeatedAbsences: PropTypes.string,
})

export const absenceChildrenPropTypes = PropTypes.arrayOf(childPropType)

export const absencesPropTypes = PropTypes.arrayOf(
  PropTypes.arrayOf(
    PropTypes.shape({
      'Absence Date': PropTypes.string.isRequired,
      'Last Name': PropTypes.string.isRequired,
      Location: PropTypes.string.isRequired,
    }),
  ),
)

export const classScheduleModifiedPropTypes = PropTypes.arrayOf(
  PropTypes.arrayOf(
    PropTypes.shape({
      roomNumber: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
    }),
  ),
)

export const makeupLocationPropTypes = PropTypes.shape({
  classSchedule: classScheduleModifiedPropTypes,
  rooms: PropTypes.arrayOf(PropTypes.string),
})
