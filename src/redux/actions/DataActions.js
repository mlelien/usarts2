import { getData } from '../../helpers/dataHelpers'
import { startSetDefault } from './MakeupActions'

const getSpreadsheetData = (spreadsheetID, data) => ({
  type: 'GET_DATA',
  spreadsheetID,
  data,
})

const getSpreadsheetDataModified = (spreadsheetID, data) => ({
  type: 'GET_DATA_MODIFIED',
  spreadsheetID,
  data,
})

export const addAbsence = child => ({
  type: 'ADD_ABSENCE',
  child,
})

export const addMakeup = makeup => ({
  type: 'ADD_MAKEUP',
  makeup,
})

export const startGetAllData = () => dispatch => Promise.all([
  getData(process.env.CLASS_SCHEDULE_FAIRFAX)
    .then((data) => {
      dispatch(getSpreadsheetData(process.env.CLASS_SCHEDULE_FAIRFAX, data))
      dispatch(getSpreadsheetDataModified(process.env.CLASS_SCHEDULE_FAIRFAX, data))
    }),

  getData(process.env.CLASS_SCHEDULE_CHANTILLY)
    .then((data) => {
      dispatch(getSpreadsheetData(process.env.CLASS_SCHEDULE_CHANTILLY, data))
      dispatch(getSpreadsheetDataModified(process.env.CLASS_SCHEDULE_CHANTILLY, data))
    }),

  getData(process.env.SCHOOL_PICKUP_FAIRFAX)
    .then((data) => {
      dispatch(getSpreadsheetData(process.env.SCHOOL_PICKUP_FAIRFAX, data))
    })
    .then(() => dispatch(startSetDefault('Fairfax'))),

  getData(process.env.SCHOOL_PICKUP_CHANTILLY)
    .then((data) => {
      dispatch(getSpreadsheetData(process.env.SCHOOL_PICKUP_CHANTILLY, data))
    }),

  getData(process.env.ROOM_FAIRFAX)
    .then((data) => {
      dispatch(getSpreadsheetData(process.env.ROOM_FAIRFAX, data))
    }),

  getData(process.env.ROOM_CHANTILLY)
    .then((data) => {
      dispatch(getSpreadsheetData(process.env.ROOM_CHANTILLY, data))
    }),

  getData(process.env.ABSENCES_SHEET)
    .then((data) => {
      dispatch(getSpreadsheetData(process.env.ABSENCES_SHEET, data))
    }),

  getData(process.env.MAKEUPS_SHEET)
    .then((data) => {
      dispatch(getSpreadsheetData(process.env.MAKEUPS_SHEET, data))
    }),

  getData(process.env.STUDENTS_FAIRFAX)
    .then((data) => {
      dispatch(getSpreadsheetData(process.env.STUDENTS_FAIRFAX, data))
    }),

  getData(process.env.STUDENTS_CHANTILLY)
    .then((data) => {
      dispatch(getSpreadsheetData(process.env.STUDENTS_CHANTILLY, data))
    }),
])

export default startGetAllData
