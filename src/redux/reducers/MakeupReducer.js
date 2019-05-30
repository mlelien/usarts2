const makeupReducer = (state = {}, action) => {
  switch (action.type) {
    case 'MAKEUP_LOCATION_CHANGED':
      return {
        ...state,
        location: action.location,
      }

    case 'SET_CHECKBOX_DEFAULT':
      return {
        ...state,
        roomsCheckboxes: action.data,
      }

    case 'ROOM_CHECKBOX_TOGGLE':
      const roomsCheckboxes = [...state.roomsCheckboxes]
      roomsCheckboxes[action.roomNumber] = !action.isChecked

      return {
        ...state,
        roomsCheckboxes,
      }

    case 'SET_MAKEUP_DATE':
      return {
        ...state,
        date: action.date,
      }

    case 'SET_FIRST_NAME_MAKEUP':
      return {
        ...state,
        firstName: action.firstName,
      }

    case 'SET_LAST_NAME_MAKEUP':
      return {
        ...state,
        lastName: action.lastName,
      }

    case 'SET_STUDENT_ID_MAKEUP':
      return {
        ...state,
        studentID: action.studentID,
      }

    case 'SET_ROOM_MAKEUP':
      return {
        ...state,
        room: action.room,
      }

    case 'SET_LOOKUP_ABSENCE_LOCATION':
      return {
        ...state,
        lookupAbsenceLocation: action.location,
      }

    case 'SET_LOOKUP_ABSENCE_DAY':
      return {
        ...state,
        lookupAbsenceDay: action.day,
      }

    case 'SET_LOOKUP_ABSENCE_TIME':
      return {
        ...state,
        lookupAbsenceTime: action.time,
      }

    case 'SET_LOOKUP_ABSENCE_ROOM':
      return {
        ...state,
        lookupAbsenceRoom: action.room,
      }

    case 'CLEAR_MAKEUP':
      return {
        roomsCheckboxes: state.roomsCheckboxes,
      }

    default: return state
  }
}

export default makeupReducer
