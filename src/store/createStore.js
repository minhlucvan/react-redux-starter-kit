import { applyMiddleware, compose, createStore } from 'redux'
import { browserHistory } from 'react-router'
import createSagaMiddleware from 'redux-saga'
import { updateLocation } from './location'
import makeRootReducer from './reducers'


export default (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const sagaRoot = createSagaMiddleware()
  const middleware = [sagaRoot]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []

  let composeEnhancers = compose

  if (__DEV__) {
    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )

  store.asyncReducers = {}

  store.sagaRoot = sagaRoot

  store.asyncSagas = {}

  store.sagaTasks = {}

  browserHistory.listen(() => {updateLocation(store)})

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
