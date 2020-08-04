import React, {Component, Fragment} from "react"
import {Link} from "react-router-dom"
import PropTypes from "prop-types"
import {Button, Link as MuiLink, Paper, Typography, withStyles} from "@material-ui/core"
import {CalendarToday, Edit as EditIcon, KeyboardReturn, Link as LinkIcon, LocationOn} from "@material-ui/icons"
import {connect} from "react-redux"
import dayjs from "dayjs"

import {logoutUser, uploadImage} from "../redux/userAction"
import EditDetails from "./EditDetails"
import ScreamButton from "../util/ScreamButton";
import ProfileSkeleton from "./ProfileSkeleton"

const styles = (theme) => ({...theme.customStyles})

class Profile extends Component {
  handleImageChange = (event) => {
    const imageFile = event.target.files[0]
    const formData = new FormData()
    formData.append("image", imageFile, imageFile.name)
    this.props.uploadImage(formData)
  }

  handleEditPicture = () => {
    document.getElementById("imageInput").click()
  }

  handleLogout = () => {
    this.props.logoutUser()
  }

  render() {
    const {classes, user: {credentials, loading, authenticated}} = this.props
    const {handle, createdAt, imageUrl, bio, website, location} = credentials
    return !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img src={imageUrl} alt={"profile"} className={"profile-image"}/>
              <input type={"file"} id={"imageInput"} hidden={"hidden"} onChange={this.handleImageChange}/>
              <ScreamButton title={"Edit profile picture"} onClick={this.handleEditPicture} buttonClass={"button"}>
                <EditIcon color={"primary"}/>
              </ScreamButton>
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
            <ScreamButton title={"Logout"} onClick={this.handleLogout}>
              <KeyboardReturn color={"primary"}/>
            </ScreamButton>
            <EditDetails/>
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
      )
    ) : <ProfileSkeleton/>
  }
}

const mapStateToProps = (state) => ({user: state.user})

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired
}

export default connect(mapStateToProps, {logoutUser, uploadImage})(withStyles(styles)(Profile))
