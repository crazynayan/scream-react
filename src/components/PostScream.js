import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"
import {Button, Dialog, CircularProgress, DialogContent, DialogTitle, TextField, withStyles} from "@material-ui/core"
import {Add as AddIcon, Close as CloseIcon} from "@material-ui/icons"
import {connect} from "react-redux"

import {postScream, openDialog, closeDialog} from "../redux/actions/dataAction"
import ScreamButton from "../util/ScreamButton"

class PostScream extends Component {
  state = {
    body: ""
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.postScream({body: this.state.body})
  }

  handleOpen = () => {
    this.setState({body: ""})
    this.props.openDialog()
  }

  getError = () => {
      return this.props.ui.errors ? this.props.ui.errors.body : null
  }

  render() {
    const {classes, ui: {loading, dialogState}, closeDialog} = this.props
    return (
      <Fragment>
        <ScreamButton onClick={this.handleOpen} title={"Post a Scream"}>
          <AddIcon/>
        </ScreamButton>
        <Dialog open={dialogState} onClose={closeDialog} fullWidth maxWidth={"sm"}>
          <ScreamButton title={"Close"} onClick={closeDialog} tipClass={classes.closeButton}>
            <CloseIcon/>
          </ScreamButton>
          <DialogTitle>Post a new scream</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField name={"body"} type={"text"} value={this.state.body} label={"SCREAM!!"} multiline rows={"3"}
                         placeholder={"Scream at your fellow friends"} onChange={this.handleChange} fullWidth
                         className={classes.textField} error={!!this.getError()} helperText={this.getError()}/>
              <Button type={"submit"} variant={"contained"} color={"primary"} className={classes.submitButton}
              disable={loading}>
                Submit
                {loading && <CircularProgress size={30} className={classes.progressSpinner}/>}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    )
  }
}

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  openDialog: PropTypes.func.isRequired,
  closeDialog: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired
}

const styles = (theme) => ({...theme.customStyles})

const mapStateToProps = (state) => ({ui: state.ui})

export default connect(mapStateToProps, {postScream, openDialog, closeDialog})(withStyles(styles)(PostScream))
