import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"
import {Link} from "react-router-dom"
import {withStyles, Paper, Typography,  Link as MuiLink} from "@material-ui/core"
import {CalendarToday, LocationOn, Link as LinkIcon} from "@material-ui/icons"
import dayjs from "dayjs"

class StaticProfile extends Component {
  render() {
    const {classes, profile: {handle, createdAt, imageUrl, bio, website, location}} = this.props
    return (
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
    )
  }
}

StaticProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const styles = theme => ({...theme.customStyles})

export default withStyles(styles)(StaticProfile)