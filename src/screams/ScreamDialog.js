import React, {useState, Fragment, useEffect, useCallback} from "react"
import PropTypes from "prop-types"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {CircularProgress, Dialog, DialogContent, Grid, Typography, withStyles} from "@material-ui/core"
import {Chat as ChatIcon, Close as CloseIcon, UnfoldMore} from "@material-ui/icons"
import dayjs from "dayjs"
import {getScream} from "../redux/dataAction"
import TooltipIconButton from "../util/TooltipIconButton"
import LikeButton from "./LikeButton"
import Comment from "./Comment"
import CommentForm from "./CommentForm"


function ScreamDialog(props) {
  const [dialogState, setDialogState] = useState(false)
  const [oldPath, setOldPath] = useState("")

  const {userHandle, screamId, getScream} = props

  const handleOpen = useCallback(() => {
    setDialogState(true)
    const newPath = `/users/${userHandle}/scream/${screamId}`
    const oldPath = newPath === window.location.pathname ? `/users/${userHandle}` : window.location.pathname
    setOldPath(oldPath)
    window.history.pushState(null, null, newPath)
    getScream(screamId)
  }, [userHandle, screamId, getScream])

  const handleClose = () => {
    window.history.pushState(null, null, oldPath)
    setDialogState(false)
  }

  useEffect(() => {
    if (props.openDialog)
      handleOpen()
  }, [props.openDialog, handleOpen])

  const {
    classes, scream: {body, createdAt, imageUrl,  likeCount, commentCount, comments},
    ui: {loading}
  } = props
  return (
    <Fragment>
      <TooltipIconButton onClick={handleOpen} title={"Expand scream"} tipClass={classes.expandButton}>
        <UnfoldMore color={"primary"}/>
      </TooltipIconButton>
      <Dialog open={dialogState} onClose={handleClose} fullWidth maxWidth={"sm"}>
        <TooltipIconButton title={"Close"} onClick={handleClose} tipClass={classes.closeButton}>
          <CloseIcon/>
        </TooltipIconButton>
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
                <TooltipIconButton title={"Comments"} disabled={true}>
                  <ChatIcon color={"primary"}/>
                </TooltipIconButton>
                <span>{commentCount} comments</span>
              </Grid>
              {<hr className={classes.invisibleSeparator}/>}
              <CommentForm screamId={screamId}/>
              <Comment comments={comments}/>
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

ScreamDialog.propTypes = {
  getScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  ui: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
}

const mapStateToProps = state => ({ui: state.ui, scream: state.data.scream})

const styles = theme => ({...theme.customStyles})

export default connect(mapStateToProps, {getScream})(withStyles(styles)(ScreamDialog))