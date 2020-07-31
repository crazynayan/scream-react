import {SET_ERRORS, CLEAR_ERRORS, LOADING_UI, OPEN_DIALOG, CLOSE_DIALOG} from "../types"

const initialState = {
  loading: false,
  errors: null,
  dialogState: false
}

export default function(state=initialState, action) {
  switch(action.type) {
    case SET_ERRORS:
      return {...state, loading: false, errors: action.payload}
    case CLEAR_ERRORS:
      return {...state, loading: false, errors: null}
    case LOADING_UI:
      return {...state, loading: true}
    case OPEN_DIALOG:
      return {...state, dialogState: true}
    case CLOSE_DIALOG:
      return {...state, dialogState: false, errors: null, loading: false}
    default:
      return state
  }
}