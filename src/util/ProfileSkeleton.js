import React from "react"
import PropTypes from "prop-types"
import {Paper, withStyles} from "@material-ui/core"
import {CalendarToday, Link as LinkIcon, LocationOn} from "@material-ui/icons"

import blankProfileImage from "../images/blank.jpg"

function ProfileSkeleton(props)  {
  const classes = props.classes
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={blankProfileImage} alt={"profile"} className="profile-image" />
        </div>
        <hr/>
        <div className={"profile-details"}>
          <div className={classes.handle}/>
          <hr/>
          <div className={classes.fullLine}/>
          <div className={classes.fullLine}/>
          <hr/>
          <LocationOn color={"primary"}/> <span>Location</span>
          <hr/>
          <LinkIcon color={"primary"}/> https://website.com
          <hr/>
          <CalendarToday color={"primary"}/> Joined date
        </div>
      </div>

    </Paper>
  )
}

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
}

const styles = theme => ({...theme.customStyles, ...theme.customStyles.profileSkeleton})

export default withStyles(styles)(ProfileSkeleton)
