import React, {useEffect} from "react"
import PropTypes from "prop-types"
import Grid from "@material-ui/core/Grid"
import {connect} from "react-redux"

import Scream from "../screams/Scream"
import Profile from "../users/Profile"
import ScreamSkeleton from "../screams/ScreamSkeleton"
import {getScreams} from "../redux/dataAction"

function Home(props) {
  const getScreams = props.getScreams

  useEffect(() => {
    getScreams()
  }, [getScreams])

  const {screams, loading} = props.data
  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {!loading ? screams.map(scream => <Scream key={scream.screamId} scream={scream}/>) : <ScreamSkeleton/>}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile/>
      </Grid>
    </Grid>
  )
}

Home.propTypes = {
  data: PropTypes.object.isRequired,
  getScreams: PropTypes.func.isRequired
}

const mapStateToProps = state => ({data: state.data})

export default connect(mapStateToProps, {getScreams})(Home)
