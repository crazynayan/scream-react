import React, {Fragment, useEffect, useState} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {Button, CircularProgress, Grid, TextField, withStyles} from "@material-ui/core"
import {submitComment} from "../redux/dataAction"
import {useForm} from "react-hook-form"

function CommentForm(props) {
  const {register, errors, setError, handleSubmit, reset} = useForm({defaultValues: {body: ""}})
  const [loading, setLoading] = useState(false)

  const onSubmit = async(data) => {
    setLoading(true)
    await props.submitComment(props.screamId, {body: data.body})
    setLoading(false)
  }

  useEffect(() => {
    props.ui.errors && Object.entries(props.ui.errors).forEach(errors => {
      const [error, message] = errors
      // noinspection JSCheckFunctionSignatures
      setError(error, {type: "manual", message: message})
    })
  }, [props.ui.errors, setError])

  useEffect(() => {
    if (!props.ui.errors && !loading)
      reset({body: ""})
  }, [reset, props.ui.errors, loading])

  const {classes, authenticated} = props
  return (
    <Fragment>
      {authenticated ? (
        <Grid item sm={12} style={{textAlign: "center"}}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField name={"body"} type={"text"} label={"Comment on scream"} className={classes.textField}
                       inputRef={register({required: "must not be empty"})} fullWidth
                       error={!!errors.body} helperText={errors?.body?.message} />
            <Button type={"submit"} variant={"contained"} color={"primary"} className={classes.button}
                    disabled={loading}>
              Submit
              {loading && <CircularProgress size={30} className={classes.progressSpinner}/>}
            </Button>
          </form>
          <hr className={classes.invisibleSeparator}/>
        </Grid>
      ) : null}
    </Fragment>
  )
}

CommentForm.propTypes = {
  screamId: PropTypes.string.isRequired,
  ui: PropTypes.object.isRequired,
  submitComment: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({ui: state.ui, authenticated: state.user.authenticated})

const styles = theme => ({...theme.customStyles})

export default connect(mapStateToProps, {submitComment})(withStyles(styles)(CommentForm))
