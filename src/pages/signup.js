import React, {Component} from "react"
import PropTypes from "prop-types"
import {Link} from "react-router-dom"
import {Button, CircularProgress, Grid, TextField, Typography, withStyles} from "@material-ui/core"
import {connect} from "react-redux"
import AppIcon from "../images/icon.png"
import {signupUser} from "../redux/actions/userAction"


const styles = (theme) => ({
  ...theme.customStyles
})

class signup extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    handle: "",
    errors: {}
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.ui.errors)
      this.setState({errors: nextProps.ui.errors})
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    this.props.signupUser({
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    }, this.props.history)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const {classes, ui: {loading}} = this.props;
    const {errors} = this.state
    // noinspection JSUnresolvedVariable
    return (
      <Grid container direction={"column"} alignItems={"center"} justify={"center"} className={classes.form}>
        <Grid item sm={4}>
          <img src={AppIcon} alt={"monkey"} className={classes.image}/>
          <Typography variant={"h3"} className={classes.pageTitle}>Signup</Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField id={"email"} name={"email"} type={"email"} label={"Email"}
                       className={classes.textField} value={this.state.email}
                       onChange={this.handleChange} helperText={errors.email}
                       error={!!errors.email} fullWidth/>
            <TextField id={"password"} name={"password"} type={"password"} label={"Password"}
                       className={classes.textField} value={this.state.password}
                       onChange={this.handleChange} helperText={errors.password}
                       error={!!errors.password} fullWidth/>
            <TextField id={"confirmPassword"} name={"confirmPassword"} type={"password"}
                       label={"Confirm Password"}
                       className={classes.textField} value={this.state.confirmPassword}
                       onChange={this.handleChange} helperText={errors.confirmPassword}
                       error={!!errors.confirmPassword} fullWidth/>
            <TextField id={"handle"} name={"handle"} type={"text"} label={"Handle"}
                       className={classes.textField} value={this.state.handle}
                       onChange={this.handleChange} helperText={errors.handle}
                       error={!!errors.handle} fullWidth/>
            {errors.general && (
              <Typography variant={"body2"} className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button type={"submit"} variant={"contained"} color={"primary"}
                    className={classes.button} disabled={loading}>
              Signup
              {loading && (
                <CircularProgress className={classes.progress} size={30}/>
              )}
            </Button>
            <br/>
            <small>Already have an account? Login <Link to={"/login"}>here</Link></small>
          </form>
        </Grid>
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({user: state.user, ui: state.ui})

export default connect(mapStateToProps, {signupUser})(withStyles(styles)(signup))
