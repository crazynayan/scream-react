import React, {Fragment, useState} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {Favorite, FavoriteBorder} from "@material-ui/icons"
import TooltipIconButton from "../util/TooltipIconButton"
import {likeScream, unLikeScream} from "../redux/dataAction"

function LikeButton(props) {
  const [loading, setLoading] = useState(false)

  const likedScream = () => {
    const {user: {likes}, screamId} = props
    return !!(likes && likes.find(like => like.screamId === screamId))
  }

  const likeScream = async() => {
    setLoading(true)
    await props.likeScream(props.screamId)
    setLoading(false)
  }

  const unlikeScream = async() => {
    setLoading(true)
    await props.unLikeScream(props.screamId)
    setLoading(false)
  }

  return (
    <Fragment>
      {!props.user.authenticated ? (
        <Link to={"/login"}>
          <TooltipIconButton title={"Like"}>
            <FavoriteBorder color={"primary"}/>
          </TooltipIconButton>
        </Link>
      ) : (
        likedScream() ? (
          <TooltipIconButton title={"Undo like"} onClick={unlikeScream} loading={loading}>
            <Favorite color={"primary"}/>
          </TooltipIconButton>
        ) : (
          <TooltipIconButton title={"Like"} onClick={likeScream} loading={loading}>
            <FavoriteBorder color={"primary"}/>
          </TooltipIconButton>
        )
      )}
    </Fragment>
  )
}

LikeButton.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unLikeScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({user: state.user})

export default connect(mapStateToProps, {likeScream, unLikeScream})(LikeButton)
