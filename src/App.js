import React from "react"
// noinspection ES6CheckImport
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core"
import jwtDecode from "jwt-decode"
import axios from "axios"
import "./App.css"
import themeFile from "./util/theme"
// Redux
import {Provider} from "react-redux"
import store from "./redux/store"
import {SET_AUTHENTICATED} from "./redux/types"
import {logoutUser, getUserData} from "./redux/actions/userAction";
// Components
import AuthRoute from "./util/AuthRoute"
import Navbar from "./components/layout/Navbar"
// Pages
import home from "./pages/home"
import login from "./pages/login"
import signup from "./pages/signup"
import user from "./pages/user"

const theme = createMuiTheme(themeFile)

axios.defaults.baseURL = "https://us-central1-scream-tutorial.cloudfunctions.net/api"

const token = localStorage.FirebaseToken
if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken * 1000 < Date.now()) {
    window.location.href = "/login"
    store.dispatch(logoutUser())
  } else {
    store.dispatch({type: SET_AUTHENTICATED})
    axios.defaults.headers.common["Authorization"] = token
    store.dispatch(getUserData())
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar/>
          <div className="container">
            <Switch>
              <Route exact path="/" component={home}/>
              <AuthRoute exact path="/login" component={login}/>
              <AuthRoute exact path="/signup" component={signup}/>
              <Route exact path={"/users/:handle"} component={user}/>
              <Route exact path={"/users/:handle/scream/:screamId"} component={user}/>
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
