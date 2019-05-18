/* eslint-disable no-underscore-dangle */
import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux'
import thunk from 'redux-thunk'
import absenceChildrenReducer from './reducers/AbsenceReducer'
import {
  fairfaxClassScheduleReducer, chantillyClassScheduleReducer, chantillySchoolReducer, fairfaxSchoolReducer, chantillyRoomReducer, fairfaxRoomReducer, absencesReducer, makeupSheetsReducer,
} from './reducers/DataReducer'
import makeupReducer from './reducers/MakeupReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  combineReducers({
    absenceChildren: absenceChildrenReducer,
    absences: absencesReducer,
    makeupSheets: makeupSheetsReducer,
    makeup: makeupReducer,
    fairfaxClassSchedule: fairfaxClassScheduleReducer,
    chantillyClassSchedule: chantillyClassScheduleReducer,
    fairfaxSchools: fairfaxSchoolReducer,
    chantillySchools: chantillySchoolReducer,
    fairfaxRooms: fairfaxRoomReducer,
    chantillyRooms: chantillyRoomReducer,
  }),
  composeEnhancers(applyMiddleware(thunk)),
)

export default store
