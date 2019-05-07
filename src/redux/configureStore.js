/* eslint-disable no-underscore-dangle */
import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux'
import thunk from 'redux-thunk'
import AbsenceReducer from './reducers/AbsenceReducer'
import {
  fairfaxClassScheduleReducer, chantillyClassScheduleReducer, chantillySchoolReducer, fairfaxSchoolReducer, chantillyRoomReducer, fairfaxRoomReducer,
} from './reducers/DataReducer'
import makeupReducer from './reducers/MakeupReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  // AbsenceReducer,
  combineReducers({
    absenceChildren: AbsenceReducer,
    fairfaxClassSchedule: fairfaxClassScheduleReducer,
    chantillyClassSchedule: chantillyClassScheduleReducer,
    fairfaxSchools: fairfaxSchoolReducer,
    chantillySchools: chantillySchoolReducer,
    fairfaxRooms: fairfaxRoomReducer,
    chantillyRooms: chantillyRoomReducer,
    roomCheckboxes: makeupReducer,
  }),
  composeEnhancers(applyMiddleware(thunk)),
)

export default store
