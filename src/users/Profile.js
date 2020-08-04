import React from "react"
import {Link} from "react-router-dom"
import PropTypes from "prop-types"
import {Button, Paper, Typography, withStyles} from "@material-ui/core"
import {Edit as EditIcon, KeyboardReturn} from "@material-ui/icons"
import {connect} from "react-redux"

import {logoutUser, uploadImage} from "../redux/userAction"
import EditDetails from "./EditDetails"
import TooltipIconButton from "../util/TooltipIconButton"
import ProfileSkeleton from "./ProfileSkeleton"
import ProfileDetails from "./ProfileDetails";


function Profile(props) {
  const handleImageChange = (event) => {
    const imageFile = event.target.files[0]
    const formData = new FormData()
    formData.append("image", imageFile, imageFile.name)
    props.uploadImage(formData)
  }
  const handleEditPicture = () => {
    document.getElementById("imageInput").click()
  }
  const handleLogout = () => {
    props.logoutUser()
  }
  const {classes, user: {credentials, loading, authenticated}} = props
  return !loading ? (
    authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={credentials.imageUrl} alt={"profile"} className={"profile-image"}/>
            <input type={"file"} id={"imageInput"} hidden={"hidden"} onChange={handleImageChange}/>
            <TooltipIconButton title={"Edit profile picture"} onClick={handleEditPicture} buttonClass={"button"}>
              <EditIcon color={"primary"}/>
            </TooltipIconButton>
          </div>
          <hr/>
          <ProfileDetails profile={credentials}/>
          <TooltipIconButton title={"Logout"} onClick={handleLogout}>
            <KeyboardReturn color={"primary"}/>
          </TooltipIconButton>
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

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired
}

const styles = (theme) => ({...theme.customStyles})
const mapStateToProps = (state) => ({user: state.user})

export default connect(mapStateToProps, {logoutUser, uploadImage})(withStyles(styles)(Profile))
