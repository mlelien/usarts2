export const roomCheckboxToggle = (isChecked, roomNumber) => ({
  type: 'ROOM_CHECKBOX_TOGGLE',
  isChecked,
  roomNumber,
})

const setDefault = data => ({
  type: 'SET_CHECKBOX_DEFAULT',
  data,
})

export const startSetDefault = location => (dispatch, getState) => {
  const state = getState()
  const roomsLength = location === 'Fairfax' ? state.fairfaxRooms.length : state.chantillyRooms.length
  const arr = Array(roomsLength).fill(true)
  dispatch(setDefault(arr))
}

export const setMakeupLocation = location => ({
  type: 'MAKEUP_LOCATION_CHANGED',
  location,
})

export const setMakeupDate = date => ({
  type: 'SET_MAKEUP_DATE',
  date,
})

export const setFirstNameMakeup = firstName => ({
  type: 'SET_FIRST_NAME_MAKEUP',
  firstName,
})

export const setLastNameMakeup = lastName => ({
  type: 'SET_LAST_NAME_MAKEUP',
  lastName,
})

export const setStudentIDMakeup = studentID => ({
  type: 'SET_STUDENT_ID_MAKEUP',
  studentID,
})

export const setRoomMakeup = room => ({
  type: 'SET_ROOM_MAKEUP',
  room,
})

export const setLookupAbsenceLocation = location => ({
  type: 'SET_LOOKUP_ABSENCE_LOCATION',
  location,
})

export const setLookupAbsenceDay = day => ({
  type: 'SET_LOOKUP_ABSENCE_DAY',
  day,
})

export const setLookupAbsenceTime = time => ({
  type: 'SET_LOOKUP_ABSENCE_TIME',
  time,
})

export const setLookupAbsenceRoom = room => ({
  type: 'SET_LOOKUP_ABSENCE_ROOM',
  room,
})

export const clearMakeup = () => ({
  type: 'CLEAR_MAKEUP',
})
