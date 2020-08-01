import React, {Component} from "react"
import PropTypes from "prop-types"
import {withStyles, Card, CardContent, CardMedia, Typography} from "@material-ui/core"
import {Link} from "react-router-dom"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import {connect} from "react-redux"
import {Chat as ChatIcon, Favorite, FavoriteBorder} from "@material-ui/icons"
import {likeScream, unLikeScream} from "../redux/actions/dataAction"
import ScreamButton from "../util/ScreamButton"
import DeleteScream from "./DeleteScream"
import ScreamDialog from "./ScreamDialog"


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
  likedScream = () => {
    const {user: {likes}, scream} = this.props
    return !!(likes && likes.find(like => like.screamId === scream.screamId))
  }

  likeScream = () => {
    this.props.likeScream(this.props.scream.screamId)
  }

  unlikeScream = () => {
    this.props.unLikeScream(this.props.scream.screamId)
  }

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
          {!authenticated ? (
            <ScreamButton title={"Like"}>
              <Link to={"/login"}>
                <FavoriteBorder color={"primary"}/>
              </Link>
            </ScreamButton>
          ) : (
            this.likedScream() ? (
              <ScreamButton title={"Undo like"} onClick={this.unlikeScream}>
                <Favorite color={"primary"}/>
              </ScreamButton>
            ) : (
              <ScreamButton title={"Like"} onClick={this.likeScream}>
                <FavoriteBorder color={"primary"}/>
              </ScreamButton>
            )
          )}
          <span>{likeCount} Likes</span>
          <ScreamButton title={"Comments"}>
            <ChatIcon color={"primary"}/>
          </ScreamButton>
          <span>{commentCount} comments</span>
          <ScreamDialog screamId={screamId} userHandle={userHandle}/>
        </CardContent>
      </Card>
    );
  }
}

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  likeScream: PropTypes.func.isRequired,
  unLikeScream: PropTypes.func.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({user: state.user})

export default connect(mapStateToProps, {likeScream, unLikeScream})(withStyles(styles)(Scream))
