import { createStore } from 'redux'
import AbsenceReducer from './reducers/AbsenceReducer'

const store = createStore(AbsenceReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store
