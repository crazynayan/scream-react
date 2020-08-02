import React, {Component} from "react"
import PropTypes from "prop-types"
import Grid from "@material-ui/core/Grid"
import {connect} from "react-redux"

import Scream from "../components/scream/Scream"
import Profile from "../components/profile/Profile"
import ScreamSkeleton from "../util/ScreamSkeleton"
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
          {!loading ? screams.map(scream => <Scream key={scream.screamId} scream={scream}/>) : <ScreamSkeleton/>}
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
