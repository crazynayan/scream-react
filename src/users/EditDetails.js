import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, withStyles} from "@material-ui/core"
import {Edit as EditIcon} from "@material-ui/icons"
import {connect} from "react-redux"

import {editUserDetails} from "../redux/userAction"
import ScreamButton from "../util/ScreamButton"

const styles = (theme) => ({
  ...theme.customStyles,
  button: {float: "right"}
})


class EditDetails extends Component {
  state = {
    bio: "",
    website: "",
    location: "",
    open: false
  }

  componentDidMount() {
    this.mapUserDetailsToState(this.props.credentials)
  }

  mapUserDetailsToState = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.bio ? credentials.website : "",
      location: credentials.bio ? credentials.location : "",
    })
  }

  handleOpen = () => {
    this.setState({open: true})
    this.mapUserDetailsToState(this.props.credentials)
  }

  handleClose = () => {
    this.setState({open: false})
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = () => {
    this.props.editUserDetails({
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location
    })
    this.handleClose()
  }

  render() {
    const {classes} = this.props
    return (
      <Fragment>
        <ScreamButton title={"Edit details"} onClick={this.handleOpen} buttonClass={classes.button}>
          <EditIcon color={"primary"}/>
        </ScreamButton>
        <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth={"sm"}>
          <DialogTitle>Edit your details</DialogTitle>
          <DialogContent>
            <form>
              <TextField name={"bio"} type={"text"} label={"Bio"} multiline rows={"3"} className={classes.textField}
                         placeholder={"A short bio about yourself"} value={this.state.bio} onChange={this.handleChange}
                         fullWidth/>
              <TextField name={"website"} type={"text"} label={"Website"} className={classes.textField}
                         value={this.state.website} placeholder={"Your personal/professional website"}
                         onChange={this.handleChange} fullWidth/>
              <TextField name={"location"} type={"text"} label={"Location"} className={classes.textField}
                         value={this.state.location} placeholder={"Where you live"} onChange={this.handleChange}
                         fullWidth/>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color={"primary"}>
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color={"primary"}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({credentials: state.user.credentials})

export default connect(mapStateToProps, {editUserDetails})(withStyles(styles)(EditDetails))