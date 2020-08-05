import React, {Fragment, useState, useEffect} from "react"
import PropTypes from "prop-types"
import {Button, CircularProgress, Dialog, DialogContent, DialogTitle, TextField, withStyles} from "@material-ui/core"
import {Close as CloseIcon, Edit as EditIcon} from "@material-ui/icons"
import {connect} from "react-redux"

import {editUserDetails} from "../redux/userAction"
import TooltipIconButton from "../util/TooltipIconButton"
import {useForm} from "react-hook-form"

function EditDetails(props) {
  const extractCredentials = credentials => {
    const {bio, website, location} = credentials
    return {
      bio: bio ? bio : "",
      website: website ? website : "",
      location: location ? location : ""
    }
  }

  const credentials = props.credentials
  const {handleSubmit, register, reset} = useForm({defaultValues: extractCredentials(credentials)})
  const [dialogState, setDialogState] = useState(false)

  useEffect(() => {
    reset(extractCredentials(credentials))
  }, [credentials, reset])

  useEffect(() => {
    if (!props.loading)
      setDialogState(false)
  }, [props.loading])

  const handleOpen = () => {
    setDialogState(true)
  }

  const handleClose = () => {
    setDialogState(false)
  }

  const onSubmit = data => {
    const credentials = {bio: data.bio, website: data.website, location: data.location}
    props.editUserDetails(credentials)
  }

  const {classes, loading} = props
  return (
    <Fragment>
      <TooltipIconButton title={"Edit details"} onClick={handleOpen} buttonClass={classes.button}>
        <EditIcon color={"primary"}/>
      </TooltipIconButton>
      <Dialog open={dialogState} onClose={handleClose} fullWidth maxWidth={"sm"}>
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <TooltipIconButton title={"Close"} onClick={handleClose} tipClass={classes.closeButton}>
            <CloseIcon/>
          </TooltipIconButton>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField name={"bio"} type={"text"} label={"Bio"} multiline rows={"3"} className={classes.textField}
                       placeholder={"A short bio about yourself"} inputRef={register()} fullWidth/>
            <TextField name={"website"} type={"text"} label={"Website"} className={classes.textField}
                       placeholder={"Your personal/professional website"} inputRef={register()} fullWidth/>
            <TextField name={"location"} type={"text"} label={"Location"} className={classes.textField}
                       placeholder={"Where you live"} inputRef={register()} fullWidth/>
            <Button type="submit" variant="contained" color="primary" className={classes.submitButton}
                    disabled={loading}>
              Save
              {loading && <CircularProgress size={30} className={classes.progressSpinner}/>}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
}
const styles = (theme) => ({...theme.customStyles, button: {float: "right"}})
const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
  loading: state.ui.loading
})

export default connect(mapStateToProps, {editUserDetails})(withStyles(styles)(EditDetails))