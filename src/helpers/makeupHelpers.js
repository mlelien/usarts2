import moment from 'moment'
import { turnToNormalDay, turnToNormalTime } from './timeHelpers'

export const getAbsences = (absencesData) => {
  const absences = [
    new Array(31),
    new Array(31),
    new Array(31),
    new Array(31),
  ]

  absencesData.forEach((absenceObj) => {
    const absenceDateObj = moment(absenceObj['Absence Date'], 'MM/DD/YYYY')
    const fourMonthsAgoDateObj = moment().subtract(4, 'months')
    const isBetweenFourMonths = absenceDateObj.isBetween(fourMonthsAgoDateObj, moment().add(1, 'days'))

    if (isBetweenFourMonths) {
      const currMonth = moment().format('M')
      const [month, day] = absenceObj['Absence Date'].split('/')
      absences[currMonth - month][day] = absenceObj
    }
  })

  return absences
}

export const getRooms = (roomsData) => {
  const rooms = []
  roomsData.forEach((roomObj) => {
    rooms[roomObj['Room No.']] = roomObj.Max
  })

  return rooms
}

export const getClassSchedule = (scheduleData) => {
  const daysOfWeek = [[], [], [], [], [], [], []]

  scheduleData.forEach((schedObj) => {
    const dayNum = turnToNormalDay(schedObj)
    const time = turnToNormalTime(schedObj)
    daysOfWeek[dayNum].push({
      roomNumber: schedObj['Room No'],
      time,
      studentCount: schedObj.Students,
    })
  })
  return daysOfWeek
}

export const getUniqueElem = arr => Array.from(new Set(arr))

export const getStudentFromList = (studentList, absenceRoom, absenceTime, firstName, lastName) => {
  const student = studentList.filter((studentObj) => {
    if (Object.entries(studentObj).length === 0 && studentObj.constructor === Object) return false

    return studentObj.ID.slice(0, 1) === 'G'
      && studentObj['Last Name'].toUpperCase() === lastName.toUpperCase()
      && studentObj['First Name'].toUpperCase() === firstName.toUpperCase()
      && turnToNormalTime(studentObj) === absenceTime
      && studentObj.Rm === absenceRoom
  })[0]

  return student
}
