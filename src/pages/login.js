import React, {Component} from "react"
import PropTypes from "prop-types"
import {Link} from "react-router-dom"
import {withStyles, Grid, Typography, TextField, Button, CircularProgress} from "@material-ui/core"
import axios from "axios"
import AppIcon from "../images/icon.png"


const styles = {
  form: {
    textAlign: "center"
  },
  image: {
    margin: "20px auto 20px auto"
  },
  pageTitle: {
    margin: "10px auto 10px auto"
  },
  textField: {
    margin: "10px auto 10px auto"
  },
  button: {
    marginTop: 20,
    position: "relative"
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10
  },
  progress: {
    position: "absolute"
  }
}

class login extends Component {
  state = {
    email: "",
    password: "",
    loading: false,
    errors: {}
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    this.setState({loading: true})
    try {
      const response = await axios.post("/login", {
        email: this.state.email,
        password: this.state.password
      })
      this.setState({loading: false})
      if (response.status === 200)
        return this.props.history.push("/")
      this.setState({errors: response.data})
    } catch (error) {
      this.setState({
        errors: error.response.data,
        loading: false
      })
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const {classes} = this.props;
    const {errors, loading} = this.state
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
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(login)
