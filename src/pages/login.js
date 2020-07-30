import React, {Component} from "react"
import PropTypes from "prop-types"
import {Link} from "react-router-dom"
import {withStyles, Grid, Typography, TextField, Button, CircularProgress} from "@material-ui/core"
import {connect} from "react-redux"
import {loginUser} from "../redux/actions/userAction"
import AppIcon from "../images/icon.png"


const styles = (theme) => ({...theme.customStyles})

class login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.ui.errors)
      this.setState({errors: nextProps.ui.errors})
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    this.props.loginUser({
      email: this.state.email,
      password: this.state.password
    }, this.props.history)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    console.log(this.props)
    const {classes, ui: {loading}} = this.props
    const {errors} = this.state
    // noinspection JSUnresolvedVariable
    return (
      <Grid container direction={"column"} alignItems={"center"} justify={"center"} className={classes.form}>
        <Grid item sm={4}>
          <img src={AppIcon} alt={"monkey"} className={classes.image}/>
          <Typography variant={"h3"} className={classes.pageTitle}>Login</Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField id={"email"} name={"email"} type={"email"} label={"Email"}
                       className={classes.textField} value={this.state.email}
                       onChange={this.handleChange} helperText={errors.email}
                       error={!!errors.email} fullWidth/>
            <TextField id={"password"} name={"password"} type={"password"} label={"Password"}
                       className={classes.textField} value={this.state.password}
                       onChange={this.handleChange} helperText={errors.password}
                       error={!!errors.password} fullWidth/>
            {errors.general && (
              <Typography variant={"body2"} className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button type={"submit"} variant={"contained"} color={"primary"}
                    className={classes.button} disabled={loading}>
              Login
              {loading && (
                <CircularProgress className={classes.progress} size={30}/>
              )}
            </Button>
            <br/>
            <small>Don't have an account? Sign up <Link to={"/signup"}>here</Link></small>
          </form>
        </Grid>
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({user: state.user, ui: state.ui})
const mapActionsToProps = {loginUser}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login))
