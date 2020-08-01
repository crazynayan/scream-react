import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {withStyles, Button, Grid, TextField} from "@material-ui/core"
import {submitComment} from "../../redux/actions/dataAction"

class CommentForm extends Component {
  state = {
    body: ""
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.submitComment(this.props.screamId, {body: this.state.body})
    this.setState({body: ""})
  }

  getError = () => {
    return this.props.ui.errors ? this.props.ui.errors.comment : null
  }

  render() {
    const {classes, authenticated} = this.props
    return (
      <Fragment>
        {authenticated ? (
          <Grid item sm={12} style={{textAlign: "center"}}>
            <form onSubmit={this.handleSubmit}>
              <TextField name={"body"} type={"text"} label={"Comment on scream"} error={!!this.getError()} fullWidth
                         helperText={this.getError()} value={this.state.body} onChange={this.handleChange}
                         className={classes.textField}/>
              <Button type={"submit"} variant={"contained"} color={"primary"} className={classes.button}>
                Submit
              </Button>
            </form>
            <hr className={classes.visibleSeparator}/>
          </Grid>
        ) : null}
      </Fragment>
    );
  }
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
