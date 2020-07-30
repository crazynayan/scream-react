import React, {Component, Fragment} from "react"
import {Link} from "react-router-dom"
import PropTypes from "prop-types"
import {Button, Link as MuiLink, Paper, Typography, withStyles} from "@material-ui/core"
import {CalendarToday, Link as LinkIcon, LocationOn} from "@material-ui/icons"
import {connect} from "react-redux"
import dayjs from "dayjs"

const styles = (theme) => ({...theme.customStyles});

class Profile extends Component {
  render() {
    const {classes, user:{credentials:{handle, createdAt, imageUrl, bio, website, location}, loading, authenticated}} = this.props
    return !loading ? (authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={imageUrl} alt={"profile"} className={"profile-image"}/>
          </div>
          <hr/>
          <div className="profile-details">
            <MuiLink component={Link} to={`/users/${handle}`} color={"primary"} variant={"h5"}>
              @{handle}
            </MuiLink>
            <hr/>
            {bio && <Fragment>
              <Typography variant={"body2"}>{bio}</Typography>
              <hr/>
            </Fragment>}
            {location && <Fragment>
              <LocationOn color={"primary"}/><span>{location}</span>
              <hr/>
            </Fragment>}
            {website && <Fragment>
              <LinkIcon color={"primary"}/>
              <a href={website} target={"_blank"} rel={"noopener noreferrer"}>
                {"  "}{website}
              </a>
              <hr/>
            </Fragment>}
            <CalendarToday color={"primary"}/>{" "}
            <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
          </div>
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant={"body2"} align={"center"}>
          No profile found, please login again
        </Typography>
        <div className={classes.buttons}>
          <Button variant={"contained"} color={"primary"} component={Link} to={"/login"}>
            Login
          </Button>
          <Button variant={"contained"} color={"secondary"} component={Link} to={"/signup"}>
            Signup
          </Button>
        </div>
      </Paper>
    )) : (<p>Loading...</p>)
  }
}

const mapStateToProps = (state) => ({user: state.user})

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(withStyles(styles)(Profile))
