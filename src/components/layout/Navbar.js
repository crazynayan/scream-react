import React, {Component, Fragment} from "react"
import {Link} from "react-router-dom"
import {AppBar, Button, Toolbar} from "@material-ui/core"
import {Home as HomeIcon, Notifications} from "@material-ui/icons"
import {connect} from "react-redux"
import PropTypes from "prop-types"

import ScreamButton from "../../util/ScreamButton"
import PostScream from "../scream/PostScream"

class Navbar extends Component {
  render() {
    const {authenticated} = this.props
    return (
      <AppBar>
        <Toolbar className={"nav-container"}>
          {authenticated ? (
            <Fragment>
              <PostScream/>
              <Link to={"/"}>
                <ScreamButton title={"Home"}>
                  <HomeIcon/>
                </ScreamButton>
              </Link>
              <ScreamButton title={"Notifications"}>
                <Notifications/>
              </ScreamButton>
            </Fragment>
          ) : (
            <Fragment>
              <Button color={"inherit"} component={Link} to={"/login"}>Login</Button>
              <Button color={"inherit"} component={Link} to={"/"}>Home</Button>
              <Button color={"inherit"} component={Link} to={"/signup"}>Signup</Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {authenticated: PropTypes.bool.isRequired}

const mapStateToProps = state => ({authenticated: state.user.authenticated})

export default connect(mapStateToProps)(Navbar)
