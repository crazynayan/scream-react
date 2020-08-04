import {
  CLEAR_ERRORS,
  CLOSE_COMMENT_DIALOG,
  CLOSE_SCREAM_DIALOG,
  LOADING_UI,
  OPEN_COMMENT_DIALOG,
  OPEN_SCREAM_DIALOG,
  SET_ERRORS,
  SET_OLD_PATH
} from "./types"

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
    case OPEN_SCREAM_DIALOG:
      return {...state, dialogStateOfScream: true}
    case CLOSE_SCREAM_DIALOG:
      return {...state, dialogStateOfScream: false, errors: null, loading: false}
    case OPEN_COMMENT_DIALOG:
      return {...state, dialogStateOfComment: true}
    case CLOSE_COMMENT_DIALOG:
      return {...state, dialogStateOfComment: false, errors: null, loading: false}
    case SET_OLD_PATH:
      return {...state, oldPath: action.payload}
    default:
      return state
  }
}