import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_USER,
  LOADING_USER,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  MARK_NOTIFICATIONS_READ,
  SET_PROFILE
} from "./types"

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  notifications: [],
  profile: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {...state, authenticated: true}
    case SET_UNAUTHENTICATED:
      return initialState
    case SET_USER:
      return {...state, ...action.payload, loading: false, authenticated: true}
    case LOADING_USER:
      return {...state, loading: true}
    case LIKE_SCREAM:
      return {
        ...state,
        likes: [...state.likes, {userHandle: state.credentials.handle, screamId: action.payload.screamId}]
      }
    case UNLIKE_SCREAM:
      return {...state, likes: state.likes.filter(like => like.screamId !== action.payload.screamId)}
    case MARK_NOTIFICATIONS_READ:
      return {...state, notifications: state.notifications.map(notification => ({...notification, read: true}))}
    case SET_PROFILE:
      return {...state, profile: action.payload}
    default:
      return state
  }
}