import { injectReducer } from '../../store/reducers'
import { runSagas } from '../../store/middlewares'

export default (store) => ({
  path : 'counter',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Counter = require('./containers/CounterContainer').default
      const {default: reducer, middlewares} = require('./modules/counter')

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'counter', reducer })
      runSagas(store, middlewares)

      /*  Return getComponent   */
      cb(null, Counter)

    /* Webpack named bundle   */
    }, 'counter')
  }
})
