import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {Favorite, FavoriteBorder} from "@material-ui/icons"
import ScreamButton from "../../util/ScreamButton"
import {likeScream, unLikeScream} from "../../redux/actions/dataAction"

class LikeButton extends Component {
  likedScream = () => {
    const {user: {likes}, screamId} = this.props
    return !!(likes && likes.find(like => like.screamId === screamId))
  }

  likeScream = () => {
    this.props.likeScream(this.props.screamId)
  }

  unlikeScream = () => {
    this.props.unLikeScream(this.props.screamId)
  }

  render() {
    return (
      <Fragment>
        {!this.props.user.authenticated ? (
          <Link to={"/login"}>
            <ScreamButton title={"Like"}>
              <FavoriteBorder color={"primary"}/>
            </ScreamButton>
          </Link>
        ) : (
          this.likedScream() ? (
            <ScreamButton title={"Undo like"} onClick={this.unlikeScream}>
              <Favorite color={"primary"}/>
            </ScreamButton>
          ) : (
            <ScreamButton title={"Like"} onClick={this.likeScream}>
              <FavoriteBorder color={"primary"}/>
            </ScreamButton>
          )
        )}
      </Fragment>
    );
  }
}

LikeButton.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unLikeScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({user: state.user})

export default connect(mapStateToProps, {likeScream, unLikeScream})(LikeButton)
