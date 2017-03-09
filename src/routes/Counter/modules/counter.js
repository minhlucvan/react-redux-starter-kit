// ------------------------------------
// Dependentcies
// ------------------------------------
import { put, takeEvery } from 'redux-saga/effects'

// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'
export const COUNTER_DOUBLE = 'COUNTER_DOUBLE'

// ------------------------------------
// Actions
// ------------------------------------
export function increment (value = 1) {
  return {
    type    : COUNTER_INCREMENT,
    payload : value
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export function doubleAsync(){
  return {
    type: COUNTER_DOUBLE_ASYNC
  }
}

export const actions = {
  increment,
  doubleAsync
}

// ------------------------------------
// Midlewares
// ------------------------------------

function*  doAsyncDouble(action){
  yield new Promise(resolve => setTimeout(resolve, 200));
  yield put({type: COUNTER_DOUBLE}); 
}

function* asyncDoubleSaga() {
  yield takeEvery(COUNTER_DOUBLE_ASYNC, doAsyncDouble)
}

export const middlewares = {
  asyncDoubleSaga
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [COUNTER_INCREMENT]    : (state, action) => state + action.payload,
  [COUNTER_DOUBLE]       : (state, action) => state * 2
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
