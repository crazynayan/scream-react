import React, {Component} from "react"
import PropTypes from "prop-types"
import Grid from "@material-ui/core/Grid"
import {connect} from "react-redux"

import Scream from "../components/Scream"
import Profile from "../components/Profile"
import {getScreams} from "../redux/actions/dataAction"

class home extends Component {
  // noinspection JSCheckFunctionSignatures
  componentDidMount() {
    this.props.getScreams()
  }

  render() {
    const {screams, loading} = this.props.data
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {!loading ? screams.map(scream => <Scream key={scream.screamId} scream={scream}/>) : <p>Loading...</p>}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile/>
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  data: PropTypes.object.isRequired,
  getScreams: PropTypes.func.isRequired
}

const mapStateToProps = state => ({data: state.data})

export default connect(mapStateToProps, {getScreams})(home)
