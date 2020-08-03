import React, {useEffect} from "react"
import PropTypes from "prop-types"
import {Link} from "react-router-dom"
import {withStyles, Grid, Typography, TextField, Button, CircularProgress} from "@material-ui/core"
import {connect} from "react-redux"
import {loginUser} from "../redux/actions/userAction"
import AppIcon from "../images/icon.png"
import {useForm, Controller} from "react-hook-form"


function Login(props) {
  const {handleSubmit, control, errors, setError} = useForm()

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
    <Grid container direction={"column"} alignItems={"center"} justify={"center"} className={classes.form}>
      <Grid item sm={4}>
        <img src={AppIcon} alt={"monkey"} className={classes.image}/>
        <Typography variant={"h3"} className={classes.pageTitle}>Login</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller name="email" control={control} as={
            <TextField id="email" name="email" label="Email" className={classes.textField}
                       error={!!errors.email} helperText={errors.email && errors.email.message} fullWidth/>
          } rules={{required: "must not be empty"}}/>
          <Controller name="password" control={control} as={
            <TextField id="password" type="password" label="Password" className={classes.textField}
                       error={!!errors.password} helperText={errors.password && errors.password.message} fullWidth/>
          } rules={{required: "must not be empty"}}/>
          <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
            Login {loading && (
            <CircularProgress className={classes.progress} size={30}/>
          )}
          </Button>
          <br/>
          <small>Don't have an account? Sign up <Link to={"/signup"}>here</Link></small>
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
