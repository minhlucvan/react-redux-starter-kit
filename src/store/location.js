import { browserHistory } from 'react-router'

// ------------------------------------
// Constants
// ------------------------------------
export const LOCATION_CHANGE = 'LOCATION_CHANGE'
export const CHANGE_LOCATION = 'CHANGE_LOCATION'

// ------------------------------------
// Actions
// ------------------------------------
export function locationChange (location = {}) {
  return {
    type    : LOCATION_CHANGE,
    payload : location
  }
}

export function changeLocation(location = {}){
  browserHistory.push(location);
}

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
export const updateLocation = ({ dispatch }) => {
  return (nextLocation) => dispatch(locationChange(nextLocation))
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = browserHistory.getCurrentLocation()
export default function locationReducer (state = initialState, action) {
  return action.type === LOCATION_CHANGE
    ? action.payload
    : state
}