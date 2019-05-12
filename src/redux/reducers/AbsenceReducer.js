const absenceDefaultState = [{
  date: null,
  location: 'Fairfax',
  lastName: '',
  firstName: '',
  studentID: '',
  room: '',
  classTime: '',
  schoolPickup: 'None',
  repeatedAbsences: '',
}]

const absenceChildrenReducer = (state = absenceDefaultState, action) => {
  const prevChild = state[state.length - 1]
  const newState = [...state]

  switch (action.type) {
    case 'ADD_CHILD':
      newState.push(prevChild)
      return newState

    case 'CLEAR_ABSENCES':
      return absenceDefaultState

    case 'SET_DATE':
      return state.map((child, i) => {
        if (i === action.i) {
          return {
            ...child,
            date: action.date,
          }
        }
        return child
      })

    case 'SET_LOCATION':
      return state.map((child, i) => {
        if (i === action.i) {
          return {
            ...child,
            location: action.location,
          }
        }
        return child
      })

    case 'SET_LAST_NAME':
      return state.map((child, i) => {
        if (i === action.i) {
          return {
            ...child,
            lastName: action.lastName,
          }
        }
        return child
      })

    case 'SET_FIRST_NAME':
      return state.map((child, i) => {
        if (i === action.i) {
          return {
            ...child,
            firstName: action.firstName,
          }
        }
        return child
      })

    case 'SET_STUDENT_ID':
      return state.map((child, i) => {
        if (i === action.i) {
          return {
            ...child,
            studentID: action.studentID,
          }
        }
        return child
      })

    case 'SET_ROOM':
      return state.map((child, i) => {
        if (i === action.i) {
          return {
            ...child,
            room: action.room,
          }
        }
        return child
      })

    case 'SET_CLASS_TIME':
      return state.map((child, i) => {
        if (i === action.i) {
          return {
            ...child,
            classTime: action.classTime,
          }
        }
        return child
      })

    case 'SET_SCHOOL_PICKUP':
      return state.map((child, i) => {
        if (i === action.i) {
          return {
            ...child,
            schoolPickup: action.schoolPickup,
          }
        }
        return child
      })

    case 'SET_REPEATED_ABSENCES':
      return state.map((child, i) => {
        if (i === action.i) {
          return {
            ...child,
            repeatedAbsences: action.repeatedAbsences,
          }
        }
        return child
      })

    default: return state
  }
}

export default absenceChildrenReducer
