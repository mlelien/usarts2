import axios from 'axios'
import moment from 'moment'

export const hasFileBeenModified = (savedData, spreadsheetId) => {
  const allLastModified = JSON.parse(localStorage.getItem('dates'))
  const newTimeObj = allLastModified.filter(file => file.id === spreadsheetId)[0]
  // console.log(newTimeObj)
  const newTime = newTimeObj.modifiedTime

  const oldTime = savedData[0].modifiedTime

  // console.log(`newTime: ${newTime}`)
  // console.log(`oldTime: ${oldTime}`)

  return newTime !== oldTime
}

export const loadDataToState = (data, spreadsheetId, field) => {
  const times = data.map(room => this.turnToNormalFormat(room[field], room.AMPM))
  if (spreadsheetId === process.env.CLASS_SCHEDULE_FAIRFAX) {
    this.setState({ fairfaxTimes: times })
  } else {
    this.setState({ chantillyTimes: times })
  }
}

export const backendGetData = (spreadsheetId, field) => {
  axios
    .get('/api/getFieldData', {
      params: {
        spreadsheetId,
      },
    })
    .then((res) => {
      loadDataToState(res.data, field)
      const serializedData = JSON.stringify(res.data)
      localStorage.setItem(spreadsheetId, serializedData)
    })
}

export const getClassSchedule = (spreadsheetId) => {

}

export const turnToNormalTime = (timeObj) => {
  const justTime = timeObj['Seq No'].slice(1)
  const amOrPm = timeObj.AMPM

  if (justTime[0] === '0') {
    return `${justTime[1]}:${justTime[2]}${justTime[3]} ${amOrPm}`
  }

  return `${justTime[0]}${justTime[1]}:${justTime[2]}${justTime[3]} ${amOrPm}`
}

const playground = () => {
  const dayOfWeek = moment()
    .startOf('month')
    .day(Number(6))
    .set('hour', 4)
    .set('minute', 30)

  console.log(dayOfWeek)
}


export const turnToNormalDate = (timeObj) => {
  // playground()
  // console.log(timeObj)
  const justTime = turnToNormalTime(timeObj)
  const [hour, parseAgain] = justTime.split(':')
  const [min, amOrPm] = parseAgain.split(' ')
  const day = Number(timeObj['Seq No'].substring(0, 1))

  const dayOfWeek = moment()
    .startOf('month')
    .day(day)
    // .set('hour', amOrPm === 'PM' ? hour + 12 : hour)
    // .set('minute', min)
  return dayOfWeek
}
