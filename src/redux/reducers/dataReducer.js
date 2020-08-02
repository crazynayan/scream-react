import {
  DELETE_SCREAM,
  LIKE_SCREAM,
  LOADING_DATA,
  POST_SCREAM,
  SET_SCREAM,
  SET_SCREAMS,
  SUBMIT_COMMENT,
  UNLIKE_SCREAM
} from "../types"

const initialState = {
  screams: [],
  scream: {},
  loading: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {...state, loading: true}
    case SET_SCREAMS:
      return {...state, screams: action.payload, loading: false}
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      return {
        ...state,
        screams: state.screams.map(scream => {
          return scream.screamId === action.payload.screamId ? {...scream, ...action.payload} : scream
        }),
        scream: state.scream.screamId === action.payload.screamId ?
          {...state.scream, ...action.payload} : state.scream
      }
    case DELETE_SCREAM:
      return {...state, screams: state.screams.filter(scream => scream.screamId !== action.payload)}
    case POST_SCREAM:
      return {...state, screams: [action.payload, ...state.screams]}
    case SET_SCREAM:
      return {...state, scream: action.payload}
    case SUBMIT_COMMENT:
      return {
        ...state,
        screams: state.screams.map(scream => {
          return scream.screamId === state.scream.screamId ? {...scream, commentCount: scream.commentCount + 1} : scream
        }),
        scream: {
          ...state.scream,
          commentCount: state.scream.commentCount + 1,
          comments: [action.payload, ...state.scream.comments]
        }
      }
    default:
      return state
  }
}