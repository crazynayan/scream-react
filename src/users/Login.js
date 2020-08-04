import React, {useEffect} from "react"
import PropTypes from "prop-types"
import {Link} from "react-router-dom"
import {Button, CircularProgress, Grid, TextField, Typography, withStyles} from "@material-ui/core"
import {connect} from "react-redux"
import {loginUser} from "../redux/userAction"
import AppIcon from "../images/icon.png"
import {useForm} from "react-hook-form"


function Login(props) {
  const {handleSubmit, errors, setError, register} = useForm({defaultValues: {email: "", password: ""}})
  const onSubmit = async (data) => {
    props.loginUser({email: data.email, password: data.password}, props.history)
  }
  useEffect(() => {
    props.ui.errors && Object.entries(props.ui.errors).forEach(errors => {
      const [error, message] = errors
      // noinspection JSCheckFunctionSignatures
      setError(error, {type: "manual", message: message})
    })
  }, [props.ui.errors, setError])
  const {classes, ui: {loading}} = props
  return (
    <Grid container direction="column" alignItems="center" justify="center" className={classes.form}>
      <Grid item sm={4}>
        <img src={AppIcon} alt={"monkey"} className={classes.image}/>
        <Typography variant={"h3"} className={classes.pageTitle}>Login</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField id="email" name="email" type="text" label="Email" className={classes.textField}
                     inputRef={register({required: "must not be empty"})}
                     error={!!errors.email} helperText={errors?.email?.message} fullWidth/>
          <TextField id="password" name="password" type="password" label="Password" className={classes.textField}
                     inputRef={register({required: "must not be empty"})}
                     error={!!errors.password} helperText={errors?.password?.message} fullWidth/>
          <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
            Login {loading && (
            <CircularProgress className={classes.progress} size={30}/>
          )}
          </Button>
          <br/>
          <small>Don't have an account? Sign up <Link to="/signup">here</Link></small>
        </form>
      </Grid>
    </Grid>
  )
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired
}

const styles = (theme) => ({...theme.customStyles})

const mapStateToProps = (state) => ({user: state.user, ui: state.ui})

export default connect(mapStateToProps, {loginUser})(withStyles(styles)(Login))
