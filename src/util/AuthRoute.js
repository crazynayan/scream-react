import React from 'react';
// noinspection ES6CheckImport
import {Route, Redirect} from "react-router-dom"
import {connect} from "react-redux"
import PropTypes from "prop-types"

function AuthRoute({component: Component, authenticated, ...rest}) {
  return (
    <Route {...rest} render={(props) => authenticated === true ? <Redirect to={"/"}/> : <Component {...props}/>}/>
  )
}

const mapStateToProps = (state) => ({authenticated: state.user.authenticated})

AuthRoute.propTypes = {user: PropTypes.object.isRequired}

export default connect(mapStateToProps)(AuthRoute)