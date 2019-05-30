export const turnToWeekDay = (dayNum) => {
  if (dayNum === 0) return 'Sunday'
  if (dayNum === 1) return 'Monday'
  if (dayNum === 2) return 'Tuesday'
  if (dayNum === 3) return 'Wednesday'
  if (dayNum === 4) return 'Thursday'
  if (dayNum === 5) return 'Friday'
  if (dayNum === 6) return 'Saturday'

  return ''
}

export const turnToNormalTime = (timeObj) => {
  const justTime = timeObj['Seq No'].slice(1)
  const amOrPm = timeObj.AMPM

  if (justTime[0] === '0') {
    return `${justTime[1]}:${justTime[2]}${justTime[3]} ${amOrPm}`
  }

  return `${justTime[0]}${justTime[1]}:${justTime[2]}${justTime[3]} ${amOrPm}`
}

export const sortTimes = times => times.sort((a, b) => new Date(`1970/01/01 ${a}`) - new Date(`1970/01/01 ${b}`))

export const turnToNormalDay = (timeObj) => {
  let day = Number(timeObj['Seq No'].substring(0, 1))

  if (day === 7) day = 0

  return day
}

export const weekDayToNumber = (weekDay) => {
  if (weekDay === 'Sunday') return 0
  if (weekDay === 'Monday') return 1
  if (weekDay === 'Tuesday') return 2
  if (weekDay === 'Wednesday') return 3
  if (weekDay === 'Thursday') return 4
  if (weekDay === 'Friday') return 5
  if (weekDay === 'Saturday') return 6

  return null
}
