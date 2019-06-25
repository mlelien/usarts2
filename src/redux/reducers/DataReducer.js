import { getClassSchedule } from '../../helpers/makeupHelpers'

export const fairfaxClassScheduleReducer = (state = {}, action) => {
  if (action.type === 'GET_DATA' && action.spreadsheetID === process.env.CLASS_SCHEDULE_FAIRFAX) {
    return action.data
  }

  return state
}

export const chantillyClassScheduleReducer = (state = {}, action) => {
  if (action.type === 'GET_DATA' && action.spreadsheetID === process.env.CLASS_SCHEDULE_CHANTILLY) {
    return action.data
  }

  return state
}

export const fairfaxClassScheduleModifiedReducer = (state = {}, action) => {
  if (action.type === 'GET_DATA_MODIFIED' && action.spreadsheetID === process.env.CLASS_SCHEDULE_FAIRFAX) {
    return getClassSchedule(action.data)
  }

  return state
}

export const chantillyClassScheduleModifiedReducer = (state = {}, action) => {
  if (action.type === 'GET_DATA_MODIFIED' && action.spreadsheetID === process.env.CLASS_SCHEDULE_CHANTILLY) {
    return getClassSchedule(action.data)
  }

  return state
}

export const fairfaxSchoolReducer = (state = {}, action) => {
  if (action.type === 'GET_DATA' && action.spreadsheetID === process.env.SCHOOL_PICKUP_FAIRFAX) {
    return action.data
  }

  return state
}

export const chantillySchoolReducer = (state = {}, action) => {
  if (action.type === 'GET_DATA' && action.spreadsheetID === process.env.SCHOOL_PICKUP_CHANTILLY) {
    return action.data
  }

  return state
}

export const fairfaxRoomReducer = (state = {}, action) => {
  if (action.type === 'GET_DATA' && action.spreadsheetID === process.env.ROOM_FAIRFAX) {
    return action.data
  }

  return state
}

export const chantillyRoomReducer = (state = {}, action) => {
  if (action.type === 'GET_DATA' && action.spreadsheetID === process.env.ROOM_CHANTILLY) {
    return action.data
  }

  return state
}

export const absencesReducer = (state = {}, action) => {
  if (action.type === 'GET_DATA' && action.spreadsheetID === process.env.ABSENCES_SHEET) {
    return action.data
  }

  if (action.type === 'ADD_ABSENCE') {
    const newState = [...state, action.child]
    return newState
  }

  return state
}

export const makeupSheetsReducer = (state = {}, action) => {
  if (action.type === 'GET_DATA' && action.spreadsheetID === process.env.MAKEUPS_SHEET) {
    return action.data
  }

  if (action.type === 'ADD_MAKEUP') {
    const newState = [...state]
    newState.push(action.makeup)
    
    return newState
  }

  return state
}

export const studentsChantillyReducer = (state = {}, action) => {
  if (action.type === 'GET_DATA' && action.spreadsheetID === process.env.STUDENTS_CHANTILLY) {
    return action.data
  }

  return state
}

export const studentsFairfaxReducer = (state = {}, action) => {
  if (action.type === 'GET_DATA' && action.spreadsheetID === process.env.STUDENTS_FAIRFAX) {
    return action.data
  }

  return state
}
