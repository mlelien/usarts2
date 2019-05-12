export const roomCheckboxToggle = (isChecked, roomNumber) => ({
  type: 'ROOM_CHECKBOX_TOGGLE',
  isChecked,
  roomNumber,
})

const setDefault = data => ({
  type: 'SET_CHECKBOX_DEFAULT',
  data,
})

export const startSetDefault = location => (dispatch, getState) => {
  const state = getState()
  const roomsLength = location === 'Fairfax' ? state.fairfaxRooms.length : state.chantillyRooms.length
  const arr = Array(roomsLength).fill(true)

  dispatch(setDefault(arr))
}

export const setMakeupLocation = location => ({
  type: 'MAKEUP_LOCATION_CHANGED',
  location,
})
