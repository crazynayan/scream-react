import {SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM} from "../types"
import axios from "axios"

export const getScreams = () => async(dispatch) => {
  dispatch({type: LOADING_DATA})
  try {
    const response = await axios.get("/screams")
    dispatch({type: SET_SCREAMS, payload: response.data})
  } catch(error) {
    dispatch({type: SET_SCREAMS, payload: []})
  }
}

export const likeScream = (screamId) => async(dispatch) => {
  try {
    const response = await axios.post(`/scream/${screamId}/like`)
    dispatch({type: LIKE_SCREAM, payload: response.data})
  } catch(error) {
    console.log(error)
  }
}

export const unLikeScream = (screamId) => async(dispatch) => {
  try {
    const response = await axios.post(`/scream/${screamId}/unlike`)
    dispatch({type: UNLIKE_SCREAM, payload: response.data})
  } catch(error) {
    console.log(error)
  }
}

export const deleteScream = (screamId) => async(dispatch) => {
  try {
    await axios.delete(`/scream/${screamId}`)
    dispatch({type: DELETE_SCREAM, payload: screamId})
  } catch(error) {
    console.log(error)
  }
}