import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ
} from "../types"
import axios from "axios"

export const loginUser = (userData, history) => async (dispatch) => {
  dispatch({type: LOADING_UI})
  try {
    const response = await axios.post("/login", userData)
    if (response.status !== 200)
      dispatch({type: SET_ERRORS, payload: response.data})
    setAuthorizationHeader(response.data.token)
    dispatch(getUserData())
    dispatch({type: CLEAR_ERRORS})
    history.push("/")
  } catch (error) {
    error.response ? dispatch({type: SET_ERRORS, payload: error.response.data}) : console.log(error)
  }
}

export const signupUser = (newUserData, history) => async (dispatch) => {
  dispatch({type: LOADING_UI})
  try {
    const response = await axios.post("/signup", newUserData)
    if (response.status !== 200)
      dispatch({type: SET_ERRORS, payload: response.data})
    setAuthorizationHeader(response.data.token)
    dispatch(getUserData())
    dispatch({type: CLEAR_ERRORS})
    history.push("/")
  } catch (error) {
    dispatch({type: SET_ERRORS, payload: error.response.data})
  }
}

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("FirebaseToken")
  delete axios.defaults.headers.common["Authorization"]
  dispatch({type: SET_UNAUTHENTICATED})
}

export const getUserData = () => async(dispatch) => {
  dispatch({type: LOADING_USER})
  try {
    const response = await axios.get("/user")
    dispatch({type: SET_USER, payload: response.data})
  } catch (error) {
    if (error.response.status === 403)
      dispatch(logoutUser())
  }
}

export const uploadImage = (formData) => async (dispatch) => {
  dispatch({type: LOADING_USER})
  try {
    await axios.post("/user/image", formData)
    dispatch(getUserData())
  } catch(error) {
    if (error.response.status === 403)
      dispatch(logoutUser())
  }
}

export const editUserDetails = (userDetails) => async(dispatch) => {
  dispatch({type: LOADING_USER})
  try {
    await axios.post("/user", userDetails)
    dispatch(getUserData())
  } catch(error) {
    if (error.response.status === 403)
      dispatch(logoutUser())
  }
}

export const markNotificationRead = (notificationsIds) => async(dispatch) => {
  try {
    await axios.post("/notifications", notificationsIds)
    dispatch({type: MARK_NOTIFICATIONS_READ})
  } catch(error) {
    console.log(error)
  }
}


const setAuthorizationHeader = (token) => {
  const firebaseToken = `Bearer ${token}`
  localStorage.setItem("FirebaseToken", firebaseToken)
  axios.defaults.headers.common["Authorization"] = firebaseToken
}
