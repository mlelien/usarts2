export const setDate = (date, i) => ({
  type: 'SET_DATE',
  date,
  i,
})

export const setLocation = (location, i) => ({
  type: 'SET_LOCATION',
  location,
  i,
})

export const setLastName = (lastName, i) => ({
  type: 'SET_LAST_NAME',
  lastName,
  i,
})

export const setFirstName = (firstName, i) => ({
  type: 'SET_FIRST_NAME',
  firstName,
  i,
})

export const setStudentID = (studentID, i) => ({
  type: 'SET_STUDENT_ID',
  studentID,
  i,
})

export const setRoom = (room, i) => ({
  type: 'SET_ROOM',
  room,
  i,
})

export const setClassTime = (classTime, i) => ({
  type: 'SET_CLASS_TIME',
  classTime,
  i,
})

export const setSchoolPickup = (schoolPickup, i) => ({
  type: 'SET_SCHOOL_PICKUP',
  schoolPickup,
  i,
})

export const setRepeatedAbsences = (repeatedAbsences, i) => ({
  type: 'SET_REPEATED_ABSENCES',
  repeatedAbsences,
  i,
})

export const addChild = () => ({
  type: 'ADD_CHILD',
})

export const clearAbsences = () => ({
  type: 'CLEAR_ABSENCES',
})
