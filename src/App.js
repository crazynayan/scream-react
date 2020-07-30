import React from "react"
// noinspection ES6CheckImport
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core"
import jwtDecode from "jwt-decode"
import "./App.css"
import themeFile from "./util/theme"
// Components
import AuthRoute from "./util/AuthRoute"
import Navbar from "./components/Navbar"
// Pages
import home from "./pages/home"
import login from "./pages/login"
import signup from "./pages/signup"

const theme = createMuiTheme(themeFile)

let authenticated = false;
const token = localStorage.FirebaseToken
if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken * 1000 < Date.now()) {
    window.location.href = "/login"
    authenticated = false
  } else
    authenticated = true
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar/>
          <div className="container">
            <Switch>
              <Route exact path="/" component={home}/>
              <AuthRoute exact path="/login" component={login} authenticated={authenticated}/>
              <AuthRoute exact path="/signup" component={signup} authenticate={authenticated}/>
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
