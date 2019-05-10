const makeupReducer = (state = {}, action) => {
  switch (action.type) {
    case 'MAKEUP_LOCATION_CHANGED':
      return {
        ...state,
        location: action.location,
      }

    case 'SET_CHECKBOX_DEFAULT':
      return {
        ...state,
        roomsCheckboxes: action.data,
      }

    case 'ROOM_CHECKBOX_TOGGLE':
      const roomsCheckboxes = [...state.roomsCheckboxes]
      roomsCheckboxes[action.roomNumber] = !action.isChecked

      return {
        ...state,
        roomsCheckboxes,
      }
    default:
      return state
  }
}

export default makeupReducer
