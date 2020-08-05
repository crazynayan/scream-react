import {CLEAR_ERRORS, LOADING_UI, SET_ERRORS, SET_OLD_PATH} from "./types"

const initialState = {
  loading: false,
  errors: null,
  dialogStateOfScream: false,
  dialogStateOfComment: false,
  oldPath: ""
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {...state, loading: false, errors: action.payload}
    case CLEAR_ERRORS:
      return {...state, loading: false, errors: null}
    case LOADING_UI:
      return {...state, loading: true}
    case SET_OLD_PATH:
      return {...state, oldPath: action.payload}
    default:
      return state
  }
}