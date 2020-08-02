import React, {Component} from "react"
import PropTypes from "prop-types"
import axios from "axios"
import {connect} from "react-redux"
import {Grid} from "@material-ui/core"
import {getAnyUserData} from "../redux/actions/dataAction"
import Scream from "../components/scream/Scream"
import StaticProfile from "../components/profile/StaticProfile"

class user extends Component {
  state = {
    profile: null,
    screamId: null
  }

  async componentDidMount() {
    const handle = this.props.match.params.handle
    const screamId = this.props.match.params.screamId
    if (screamId)
      this.setState({screamId: screamId})
    this.props.getAnyUserData(handle)
    try {
      const response = await axios.get(`/user/${handle}`)
      this.setState({profile: response.data.user})
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const {screams, loading} = this.props.data
    const {screamId} = this.state
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {!loading ? (
            screams !== null ? (
              screams.map(scream => <Scream key={scream.screamId} scream={scream}
                                            openDialog={screamId && scream.screamId === screamId}/>)
            ) : <p>No screams for this user</p>
          ) : <p>Loading...</p>}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? <p>Loading profile...</p> : <StaticProfile profile={this.state.profile}/>}
        </Grid>
      </Grid>
    )
  }
}

user.propTypes = {
  getAnyUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({data: state.data})

export default connect(mapStateToProps, {getAnyUserData})(user)
