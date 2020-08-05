import React, {useState, Fragment} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {Button, Dialog, DialogTitle, DialogActions, withStyles, CircularProgress} from "@material-ui/core"
import {DeleteOutline} from "@material-ui/icons"
import TooltipIconButton from "../util/TooltipIconButton"
import {deleteScream} from "../redux/dataAction"


function DeleteScream(props) {
  const [dialogState, setDialogState] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleOpen = () => {
    setDialogState(true)
  }

  const handleClose = () => {
    setDialogState(false)
  }

  const deleteScream = async() => {
    setLoading(true)
    await props.deleteScream(props.screamId)
    setLoading(false)
    setDialogState(false)
  }

    const {classes} = props
    return (
      <Fragment>
        <TooltipIconButton title={"Delete Scream"} onClick={handleOpen} buttonClass={classes.deleteButton}>
          <DeleteOutline color={"secondary"}/>
        </TooltipIconButton>
        <Dialog open={dialogState} onClose={handleClose} fullWidth maxWidth={"sm"}>
          <DialogTitle>Are you sure you want to delete this scream?</DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} color={"primary"} variant="contained">
              Cancel
            </Button>
            <Button onClick={deleteScream} color={"secondary"} variant="contained" disabled={loading}>
              Delete
              {loading && <CircularProgress size={30} className={classes.progressSpinner}/>}
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
}

DeleteScream.propTypes = {
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  deleteScream: PropTypes.func.isRequired
}
const styles = (theme) => ({...theme.customStyles})
export default connect(null, {deleteScream})(withStyles(styles)(DeleteScream))
