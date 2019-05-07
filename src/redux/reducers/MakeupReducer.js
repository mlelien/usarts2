// import { chantillyClassScheduleReducer, fairfaxClassScheduleReducer } from './DataReducer'

// const fairfaxRooms = []
// fairfaxClassScheduleReducer().forEach((roomObj) => {
//   // console.log(roomObj)
//   // console.log(roomObj['Room No'])
//   fairfaxRooms[roomObj['Room No']] = true
// })

// const chantillyRooms = []
// chantillyClassScheduleReducer().forEach((roomObj) => {
//   chantillyRooms[roomObj['Room No']] = true
// })

// const defaultState = {
//   fairfaxRooms,
//   chantillyRooms,
// }

// const makeupReducer = (state = defaultState, action) => {
//   const rooms = action.location === 'Fairfax' ? state.fairfaxRooms : state.chantillyRooms

//   const isChecked = rooms[action.roomNumber]
//   rooms[action.roomNumber] = !isChecked

//   return action.location === 'Fairfax' ? ({
//     ...state,
//     fairfaxRooms: rooms,
//   }) : ({
//     ...state,
//     chantillyRooms: rooms,
//   })
// }


// // switch (action.type) {
// //   case 'ROOM_CHECKBOX_TOGGLE':
// //     rooms[action.roomNumber] = !rooms[action.roomNumber]
// //     break

// //   default:
// //     return state
// // }

// export default makeupReducer
