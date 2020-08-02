import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {CircularProgress, Dialog, DialogContent, Grid, Typography, withStyles} from "@material-ui/core"
import {Chat as ChatIcon, Close as CloseIcon, UnfoldMore} from "@material-ui/icons"
import dayjs from "dayjs"
import {closeCommentDialog, getScream, openCommentDialog} from "../../redux/actions/dataAction"
import ScreamButton from "../../util/ScreamButton"
import LikeButton from "./LikeButton"
import Comment from "./Comment";
import CommentForm from "./CommentForm";


class ScreamDialog extends Component {

  handleOpen = () => {
    this.props.openCommentDialog()
    this.props.getScream(this.props.screamId)
  }

  render() {
    const {
      classes, scream: {body, createdAt, imageUrl, userHandle, screamId, likeCount, commentCount, comments},
      ui: {loading, dialogStateOfComment}, closeCommentDialog
    } = this.props
    return (
      <Fragment>
        <ScreamButton onClick={this.handleOpen} title={"Expand scream"} tipClass={classes.expandButton}>
          <UnfoldMore color={"primary"}/>
        </ScreamButton>
        <Dialog open={dialogStateOfComment} onClose={closeCommentDialog} fullWidth maxWidth={"sm"}>
          <ScreamButton title={"Close"} onClick={closeCommentDialog} tipClass={classes.closeButton}>
            <CloseIcon/>
          </ScreamButton>
          <DialogContent className={classes.dialogContent}>
            {loading ? (
              <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2}/>
              </div>
            ) : (
              <Grid container spacing={2}>
                <Grid item sm={5}>
                  <img src={imageUrl} alt={"Profile"} className={classes.profileImage}/>
                </Grid>
                <Grid item sm={7}>
                  <Typography component={Link} to={`/users/${userHandle}`} color={"primary"} variant={"h5"}>
                    @{userHandle}
                  </Typography>
                  <hr className={classes.invisibleSeparator}/>
                  <Typography variant={"body2"} color={"textSecondary"}>
                    {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                  </Typography>
                  <hr className={classes.invisibleSeparator}/>
                  <Typography variant={"body1"}>
                    {body}
                  </Typography>
                  <LikeButton screamId={screamId}/>
                  <span>{likeCount} Likes</span>
                  <ScreamButton title={"Comments"}>
                    <ChatIcon color={"primary"}/>
                  </ScreamButton>
                  <span>{commentCount} comments</span>
                </Grid>
                {<hr className={classes.visibleSeparator}/>}
                <CommentForm screamId={screamId}/>
                <Comment comments={comments}/>
              </Grid>
            )}
          </DialogContent>
        </Dialog>
      </Fragment>
    )
  }
}

ScreamDialog.propTypes = {
  getScream: PropTypes.func.isRequired,
  openCommentDialog: PropTypes.func.isRequired,
  closeCommentDialog: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  ui: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired
}

const mapStateToProps = state => ({ui: state.ui, scream: state.data.scream})
const mapActionToProps = {getScream, openCommentDialog, closeCommentDialog}

const styles = theme => ({...theme.customStyles})

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(ScreamDialog))