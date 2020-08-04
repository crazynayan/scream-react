import React, {Fragment} from "react"
import PropTypes from "prop-types"
import {Link as MuiLink, Typography} from "@material-ui/core"
import {Link} from "react-router-dom"
import {CalendarToday, Link as LinkIcon, LocationOn} from "@material-ui/icons"
import dayjs from "dayjs"

function ProfileDetails(props) {
  const {handle, bio, location, website, createdAt} = props.profile
  return (
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
  )
}

ProfileDetails.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileDetails
