import React from "react"
import PropTypes from "prop-types"
import {Paper, withStyles} from "@material-ui/core"
import ProfileDetails from "./ProfileDetails"

function StaticProfile(props) {
  const {classes, profile} = props
  // noinspection JSUnresolvedVariable
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={profile.imageUrl} alt={"profile"} className={"profile-image"}/>
        </div>
        <hr/>
        <ProfileDetails profile={profile}/>
      </div>
    </Paper>
  )
}

StaticProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const styles = theme => ({...theme.customStyles})

export default withStyles(styles)(StaticProfile)