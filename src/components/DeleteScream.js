import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {Button, Dialog, DialogTitle, DialogActions, withStyles} from "@material-ui/core"
import {DeleteOutline} from "@material-ui/icons"
import ScreamButton from "../util/ScreamButton"
import {deleteScream} from "../redux/actions/dataAction"


class DeleteScream extends Component {
  state = {
    open: false
  }
  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  deleteScream = () => {
    this.props.deleteScream(this.props.screamId)
    this.setState({open: false})
  }

  render() {
    const {classes} = this.props
    return (
      <Fragment>
        <ScreamButton title={"Delete Scream"} onClick={this.handleOpen} buttonClass={classes.deleteButton}>
          <DeleteOutline color={"secondary"}/>
        </ScreamButton>
        <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth={"sm"}>
          <DialogTitle>Are you sure you want to delete this scream?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color={"primary"}>
              Cancel
            </Button>
            <Button onClick={this.deleteScream} color={"secondary"}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

DeleteScream.propTypes = {
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  deleteScream: PropTypes.func.isRequired
}
const styles = (theme) => ({...theme.customStyles})
export default connect(null, {deleteScream})(withStyles(styles)(DeleteScream))
