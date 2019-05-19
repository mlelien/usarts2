export const turnToLongDay = (dayNum) => {
  if (dayNum === 0) return 'Sunday'
  if (dayNum === 1) return 'Monday'
  if (dayNum === 2) return 'Tuesday'
  if (dayNum === 3) return 'Wednesday'
  if (dayNum === 4) return 'Thursday'
  if (dayNum === 5) return 'Friday'
  if (dayNum === 6) return 'Saturday'
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
  let day = Number(timeObj['Seq No'].substring(0, 1))

  if (day === 7) day = 0

  return day
}
