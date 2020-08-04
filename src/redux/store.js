import {createStore, combineReducers, applyMiddleware, compose} from "redux"
import thunk from "redux-thunk"
import userReducer from "./userReducer"
import dataReducer from "./dataReducer"
import uiReducer from "./uiReducer"

// Reducer
const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
  ui: uiReducer
})

// Initial State
const initialState = {}

// Middleware
const middleware = [thunk]
// noinspection JSUnresolvedVariable
const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose
// noinspection JSCheckFunctionSignatures
const enhancer = composeEnhancers(applyMiddleware(...middleware))

const store = createStore(reducers, initialState, enhancer)

export default store
