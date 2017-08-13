import { combineReducers } from 'redux'

// Placeholder for configureStore
function baseReducer(state={}, action) {
  switch (action.type) {
    default:
      return state
  }
}

const rootReducer = combineReducers({
  baseReducer,
})

export default rootReducer
