import { getData } from '../../helpers/dataHelpers'

const getSpreadsheetData = (spreadsheetID, data) => ({
  type: 'GET_DATA',
  spreadsheetID,
  data,
})

export const startGetAllData = () => dispatch => (
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
)

export default startGetAllData
