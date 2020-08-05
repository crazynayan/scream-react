import React, {Fragment, useEffect, useState} from "react"
import PropTypes from "prop-types"
import {Button, CircularProgress, Dialog, DialogContent, DialogTitle, TextField, withStyles} from "@material-ui/core"
import {Add as AddIcon, Close as CloseIcon} from "@material-ui/icons"
import {connect} from "react-redux"
import {useForm} from "react-hook-form"

import {postScream} from "../redux/dataAction"
import TooltipIconButton from "../util/TooltipIconButton"

function PostScream(props) {
  const {handleSubmit, register, errors, setError, reset} = useForm({defaultValues: {body: ""}})
  const [dialogState, setDialogState] = useState(false)

  const onSubmit = (data) => {
    props.postScream({body: data.body})
  }

  const handleOpen = () => {
    reset({body: ""})
    setDialogState(true)
  }

  const handleClose = () => {
    setDialogState(false)
  }

  useEffect(() => {
    if (!props.ui.errors && !props.ui.loading)
      setDialogState(false)
  }, [props.ui.errors, props.ui.loading])

  useEffect(() => {
    props.ui.errors && Object.entries(props.ui.errors).forEach(errors => {
      const [error, message] = errors
      // noinspection JSCheckFunctionSignatures
      setError(error, {type: "manual", message: message})
    })
  }, [props.ui.errors, setError])

  const {classes, ui: {loading}} = props
  return (
    <Fragment>
      <TooltipIconButton onClick={handleOpen} title={"Post a Scream"}>
        <AddIcon/>
      </TooltipIconButton>
      <Dialog open={dialogState} onClose={handleClose} fullWidth maxWidth={"sm"}>
        <TooltipIconButton title={"Close"} onClick={handleClose} tipClass={classes.closeButton}>
          <CloseIcon/>
        </TooltipIconButton>
        <DialogTitle>Post a new scream</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField name="body" type="text" label="SCREAM!!" multiline rows="3" className={classes.textField}
                       inputRef={register({required: "must not be empty"})} placeholder="Scream at your fellow friends"
                       error={!!errors.body} helperText={errors?.body?.message} fullWidth/>
            <Button type={"submit"} variant={"contained"} color={"primary"} className={classes.submitButton}
                    disabled={loading}>
              Submit
              {loading && <CircularProgress size={30} className={classes.progressSpinner}/>}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired
}

const styles = (theme) => ({...theme.customStyles})

const mapStateToProps = (state) => ({ui: state.ui})

export default connect(mapStateToProps, {postScream})(withStyles(styles)(PostScream))
