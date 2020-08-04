import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {Grid} from "@material-ui/core"
import {getAnyUserData} from "../redux/dataAction"
import Scream from "../screams/Scream"
import StaticProfile from "./StaticProfile"
import ProfileSkeleton from "./ProfileSkeleton"
import ScreamSkeleton from "../screams/ScreamSkeleton"

function AnyUser(props) {
  const [screamId, setScreamId] = useState(null)
  const handle = props.match.params.handle
  const paramsScreamId = props.match.params.screamId
  const getAnyUserData = props.getAnyUserData

  useEffect(() => {
    getAnyUserData(handle)
    if (paramsScreamId)
      setScreamId(paramsScreamId);
  }, [getAnyUserData, handle, paramsScreamId])

  const {screams, loading} = props.data
  const profile = props.profile
  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {!loading ? (
          screams !== null ? (
            screams.map(scream => <Scream key={scream.screamId} scream={scream}
                                          openDialog={screamId && scream.screamId === screamId}/>)
          ) : <p>No screams for this user</p>
        ) : <ScreamSkeleton/>}
      </Grid>
      <Grid item sm={4} xs={12}>
        {!loading && profile ?  <StaticProfile profile={profile}/> :<ProfileSkeleton/>}
      </Grid>
    </Grid>
  )
}

AnyUser.propTypes = {
  getAnyUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  data: state.data,
  profile: state.user.profile
})

export default connect(mapStateToProps, {getAnyUserData})(AnyUser)
