import {
  CLOSE_DIALOG,
  DELETE_SCREAM,
  LIKE_SCREAM,
  LOADING_DATA,
  LOADING_UI,
  OPEN_DIALOG,
  POST_SCREAM,
  SET_ERRORS,
  SET_SCREAMS,
  UNLIKE_SCREAM
} from "../types"
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

export const postScream = (newScream) => async (dispatch) => {
  dispatch({type: LOADING_UI})
  try {
    const response = await axios.post("/scream", newScream)
    dispatch({type: POST_SCREAM, payload: response.data})
    dispatch({type: CLOSE_DIALOG})
  } catch (error) {
    dispatch({type: SET_ERRORS, payload: error.response.data})
  }
}
export const likeScream = (screamId) => async (dispatch) => {
  try {
    const response = await axios.post(`/scream/${screamId}/like`)
    dispatch({type: LIKE_SCREAM, payload: response.data})
  } catch (error) {
    console.log(error)
  }
}

export const unLikeScream = (screamId) => async (dispatch) => {
  try {
    const response = await axios.post(`/scream/${screamId}/unlike`)
    dispatch({type: UNLIKE_SCREAM, payload: response.data})
  } catch (error) {
    console.log(error)
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

export const openDialog = () => (dispatch) => {
  dispatch({type:OPEN_DIALOG})
}

export const closeDialog = () => (dispatch) => {
  dispatch({type:CLOSE_DIALOG})
}
