import React, {Component} from "react"
import Grid from "@material-ui/core/Grid"
import axios from "axios"

import Scream from "../components/Scream"
import Profile from "../components/Profile"

class home extends Component {
  state = {
    screams: null
  }

  // noinspection JSCheckFunctionSignatures
  async componentDidMount() {
    try {
      const response = await axios.get("/screams")
      this.setState({screams: response.data})
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    // noinspection JSUnresolvedVariable
    let recentScreamsMarkup = this.state.screams ? (
      this.state.screams.map(scream => <Scream key={scream.screamId} scream={scream}/>)
    ) : <p>Loading...</p>
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile/>
        </Grid>
      </Grid>
    );
  }
}

export default home
