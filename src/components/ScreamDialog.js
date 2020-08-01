import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {CircularProgress, Dialog, DialogContent, Grid, Typography, withStyles} from "@material-ui/core"
import {Close as CloseIcon, UnfoldMore} from "@material-ui/icons"
import dayjs from "dayjs"
import {closeDialog, getScream, openDialog} from "../redux/actions/dataAction"
import ScreamButton from "../util/ScreamButton"


class ScreamDialog extends Component {

  handleOpen = () => {
    this.props.openDialog()
    this.props.getScream(this.props.screamId)
  }

  render() {
    const {
      classes, scream: { body, createdAt, imageUrl, userHandle},
      ui: {loading, dialogState}, closeDialog
    } = this.props
    return (
      <Fragment>
        <ScreamButton onClick={this.handleOpen} title={"Expand scream"} tipClass={classes.expandButton}>
          <UnfoldMore color={"primary"}/>
        </ScreamButton>
        <Dialog open={dialogState} onClose={closeDialog} fullWidth maxWidth={"sm"}>
          <ScreamButton title={"Close"} onClick={closeDialog} tipClass={classes.closeButton}>
            <CloseIcon/>
          </ScreamButton>
          <DialogContent className={classes.dialogContent}>
            {loading ? <CircularProgress size={200}/> : (
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
                </Grid>
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
  openDialog: PropTypes.func.isRequired,
  closeDialog: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  ui: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired
}

const mapStateToProps = state => ({ui: state.ui, scream: state.data.scream})
const mapActionToProps = {getScream, openDialog, closeDialog}

const styles = theme => ({...theme.customStyles})

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(ScreamDialog))