import {SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM} from "../types"
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
    const response = await axios.get(`/scream/${screamId}/like`)
    dispatch({type: LIKE_SCREAM, payload: response.data})
  } catch(error) {
    console.log(error)
  }
}

export const unLikeScream = (screamId) => async(dispatch) => {
  try {
    const response = await axios.get(`/scream/${screamId}/unlike`)
    dispatch({type: UNLIKE_SCREAM, payload: response.data})
  } catch(error) {
    console.log(error)
  }
}