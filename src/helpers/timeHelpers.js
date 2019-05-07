import moment from 'moment'

const playground = () => {
  const dayOfWeek = moment()
    .startOf('month')
    .day(Number(6))
    .set('hour', 4)
    .set('minute', 30)
}

export const turnToNormalTime = (timeObj) => {
  const justTime = timeObj['Seq No'].slice(1)
  const amOrPm = timeObj.AMPM

  if (justTime[0] === '0') {
    return `${justTime[1]}:${justTime[2]}${justTime[3]} ${amOrPm}`
  }

  return `${justTime[0]}${justTime[1]}:${justTime[2]}${justTime[3]} ${amOrPm}`
}

export const turnToNormalDay = (timeObj) => {
  // playground()
  // console.log(timeObj)
  const justTime = turnToNormalTime(timeObj)
  const [hour, parseAgain] = justTime.split(':')
  const [min, amOrPm] = parseAgain.split(' ')
  let day = Number(timeObj['Seq No'].substring(0, 1))

  if (day === 7) day = 0

  return day

  // const dayOfWeek = moment()
  //   .startOf('month')
  //   .day(day)
  //   // .set('hour', amOrPm === 'PM' ? hour + 12 : hour)
  //   // .set('minute', min)
  // return dayOfWeek
}
