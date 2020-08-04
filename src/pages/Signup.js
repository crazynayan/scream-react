import React, {useEffect, useRef} from "react"
import PropTypes from "prop-types"
import {Link} from "react-router-dom"
import {Button, CircularProgress, Grid, TextField, Typography, withStyles} from "@material-ui/core"
import {connect} from "react-redux"
import AppIcon from "../images/icon.png"
import {signupUser} from "../redux/userAction"
import {useForm} from "react-hook-form"
import {emailRegex} from "../util/config"


function Signup(props) {
  const defaultValues = {email: "", password: "", confirmPassword: "", handle: ""}
  const {handleSubmit, register, errors, setError, watch} = useForm({defaultValues: defaultValues})
  const password = useRef({})
  // noinspection JSCheckFunctionSignatures
  password.current = watch("password", "")
  useEffect(() => {
    props.ui.errors && Object.entries(props.ui.errors).forEach(errors => {
      const [error, message] = errors
      // noinspection JSCheckFunctionSignatures
      setError(error, {type: "manual", message: message})
    })
  }, [props.ui.errors, setError])
  const onSubmit = async (data) => {
    props.signupUser({
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      handle: data.handle
    }, props.history)
  }
  const {classes, ui: {loading}} = props
  return (
    <Grid container direction="column" alignItems="center" justify="center" className={classes.form}>
      <Grid item sm={4}>
        <img src={AppIcon} alt="monkey" className={classes.image}/>
        <Typography variant={"h3"} className={classes.pageTitle}>Signup</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField id="email" name="email" type="text" label="Email" className={classes.textField}
                     inputRef={register({
                       required: "must not be empty",
                       pattern: {value: emailRegex, message: "invalid email format"}
                     })}
                     error={!!errors.email} helperText={errors?.email?.message} fullWidth/>
          <TextField id="password" name="password" type="password" label="Password" className={classes.textField}
                     inputRef={register({required: "must not be empty"})}
                     error={!!errors.password} helperText={errors?.password?.message} fullWidth/>
          <TextField id="confirmPassword" name="confirmPassword" type="password" label="Confirm Password"
                     className={classes.textField}  fullWidth
                     inputRef={register({validate: value => value === password.current || "passwords do not match"})}
                     error={!!errors.confirmPassword} helperText={errors?.confirmPassword?.message}/>
          <TextField id="handle" name="handle" type="handle" label="Handle" className={classes.textField}
                     inputRef={register({required: "must not be empty"})}
                     error={!!errors.handle} helperText={errors?.handle?.message} fullWidth/>
          <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
            Signup {loading && (
            <CircularProgress className={classes.progress} size={30}/>
          )}
          </Button>
          <br/>
          <small>Already have an account? Login <Link to="/login">here</Link></small>
        </form>
      </Grid>
    </Grid>
  )
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({user: state.user, ui: state.ui})
const styles = (theme) => ({...theme.customStyles})

export default connect(mapStateToProps, {signupUser})(withStyles(styles)(Signup))
