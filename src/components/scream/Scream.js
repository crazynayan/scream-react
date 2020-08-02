import React, {Component} from "react"
import PropTypes from "prop-types"
import {Card, CardContent, CardMedia, Typography, withStyles} from "@material-ui/core"
import {Link} from "react-router-dom"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import {connect} from "react-redux"
import {Chat as ChatIcon} from "@material-ui/icons"
import ScreamButton from "../../util/ScreamButton"
import DeleteScream from "./DeleteScream"
import ScreamDialog from "./ScreamDialog"
import LikeButton from "./LikeButton"


const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  }
}

class Scream extends Component {
  render() {
    dayjs.extend(relativeTime)
    const {
      classes, scream: {body, createdAt, imageUrl, userHandle, likeCount, commentCount, screamId},
      user: {authenticated, credentials: {handle}}
    } = this.props
    return (
      <Card className={classes.card}>
        <CardMedia className={classes.image} image={imageUrl} title={"Profile image"}/>
        <CardContent className={classes.content}>
          <Typography variant={"h5"} component={Link} to={`/users/${userHandle}`}
                      color={"primary"}>{userHandle}</Typography>
          {authenticated && userHandle === handle ? <DeleteScream screamId={screamId}/> : null}
          <Typography variant={"body2"} color={"textSecondary"}>{dayjs(createdAt).fromNow()}</Typography>
          <Typography variant={"body1"}>{body}</Typography>
          <LikeButton screamId={screamId}/>
          <span>{likeCount} Likes</span>
          <ScreamButton title={"Comments"}>
            <ChatIcon color={"primary"}/>
          </ScreamButton>
          <span>{commentCount} comments</span>
          <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={this.props.openDialog}/>
        </CardContent>
      </Card>
    )
  }
}

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
}

const mapStateToProps = state => ({user: state.user})

export default connect(mapStateToProps)(withStyles(styles)(Scream))
