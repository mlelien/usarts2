import { getData } from '../../helpers/dataHelpers'
import { startSetDefault } from './MakeupActions'

const getSpreadsheetData = (spreadsheetID, data) => ({
  type: 'GET_DATA',
  spreadsheetID,
  data,
})

export const startGetAllData = () => (dispatch) => {
  console.log('in startGetAllData')
  console.log(`process.env.CLASS_SCHEDULE_FAIRFAX: ${process.env.CLASS_SCHEDULE_FAIRFAX}`)
  return (
    getData(process.env.CLASS_SCHEDULE_FAIRFAX)
      .then((data) => {
        dispatch(getSpreadsheetData(process.env.CLASS_SCHEDULE_FAIRFAX, data))
      })
      .then(() => getData(process.env.CLASS_SCHEDULE_CHANTILLY)
        .then((data) => {
          dispatch(getSpreadsheetData(process.env.CLASS_SCHEDULE_CHANTILLY, data))
        }))
      .then(() => getData(process.env.SCHOOL_PICKUP_FAIRFAX)
        .then((data) => {
          dispatch(getSpreadsheetData(process.env.SCHOOL_PICKUP_FAIRFAX, data))
        }))
      .then(() => getData(process.env.SCHOOL_PICKUP_CHANTILLY)
        .then((data) => {
          dispatch(getSpreadsheetData(process.env.SCHOOL_PICKUP_CHANTILLY, data))
        }))
      .then(() => getData(process.env.ROOM_FAIRFAX)
        .then((data) => {
          dispatch(getSpreadsheetData(process.env.ROOM_FAIRFAX, data))
        }))
      .then(() => getData(process.env.ROOM_CHANTILLY)
        .then((data) => {
          dispatch(getSpreadsheetData(process.env.ROOM_CHANTILLY, data))
        }))
      .then(() => getData(process.env.ABSENCES_SHEET)
        .then((data) => {
          dispatch(getSpreadsheetData(process.env.ABSENCES_SHEET, data))
        }))
      .then(() => getData(process.env.MAKEUPS_SHEET)
        .then((data) => {
          dispatch(getSpreadsheetData(process.env.MAKEUPS_SHEET, data))
        }))
      .then(() => dispatch(startSetDefault('Fairfax')))
  )
}

export default startGetAllData
