import {
  CLEAR_ERRORS,
  DELETE_SCREAM,
  LIKE_SCREAM,
  LOADING_DATA,
  LOADING_UI,
  POST_SCREAM,
  SET_ERRORS,
  SET_PROFILE,
  SET_SCREAM,
  SET_SCREAMS,
  SUBMIT_COMMENT,
  UNLIKE_SCREAM
} from "./types"
import axios from "axios"

export const getScreams = () => async (dispatch) => {
  dispatch({type: LOADING_DATA})
  try {
    const response = await axios.get("/screams")
    dispatch({type: SET_SCREAMS, payload: response.data})
  } catch (error) {
    dispatch({type: SET_SCREAMS, payload: []})
  }
}

export const getScream = (screamId) => async (dispatch) => {
  dispatch({type: LOADING_UI})
  try {
    const response = await axios.get(`/scream/${screamId}`)
    dispatch({type: SET_SCREAM, payload: response.data})
    dispatch({type: CLEAR_ERRORS})
  } catch (error) {
    console.log(error)
  }
}

export const postScream = (newScream) => async (dispatch) => {
  dispatch({type: LOADING_UI})
  try {
    const response = await axios.post("/scream", newScream)
    dispatch({type: POST_SCREAM, payload: response.data})
    dispatch({type: CLEAR_ERRORS})
  } catch (error) {
    dispatch({type: SET_ERRORS, payload: error.response.data})
  }
}
export const likeScream = (screamId) => async (dispatch) => {
  try {
    const response = await axios.post(`/scream/${screamId}/like`)
    dispatch({type: LIKE_SCREAM, payload: response.data})
    dispatch({type: CLEAR_ERRORS})
  } catch (error) {
    dispatch({type: SET_ERRORS, payload: error.response.data})
  }
}

export const unLikeScream = (screamId) => async (dispatch) => {
  try {
    const response = await axios.post(`/scream/${screamId}/unlike`)
    dispatch({type: UNLIKE_SCREAM, payload: response.data})
    dispatch({type: CLEAR_ERRORS})
  } catch (error) {
    dispatch({type: SET_ERRORS, payload: error.response.data})
  }
}

export const submitComment = (screamId, commentData) => async (dispatch) => {
  try {
    const response = await axios.post(`/scream/${screamId}/comment`, commentData)
    dispatch({type: SUBMIT_COMMENT, payload: response.data})
    dispatch({type: CLEAR_ERRORS})
  } catch (error) {
    dispatch({type: SET_ERRORS, payload: error.response.data})
  }
}

export const deleteScream = (screamId) => async (dispatch) => {
  try {
    await axios.delete(`/scream/${screamId}`)
    dispatch({type: DELETE_SCREAM, payload: screamId})
  } catch (error) {
    console.log(error)
  }
}

export const getAnyUserData = userHandle => async (dispatch) => {
  dispatch({type: LOADING_DATA})
  try {
    const response = await axios.get(`/user/${userHandle}`)
    dispatch({type: SET_PROFILE, payload: response.data.user})
    dispatch({type: SET_SCREAMS, payload: response.data.screams})
  } catch (error) {
    dispatch({type: SET_SCREAMS, payload: []})
  }
}
