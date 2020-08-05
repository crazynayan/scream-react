import React, {Fragment} from "react"
import PropTypes from "prop-types"
import {Grid, Typography, withStyles} from "@material-ui/core"
import {Link} from "react-router-dom"
import dayjs from "dayjs"

function Comment(props) {
  const {comments, classes} = props
  return (
    <Grid container>
      {comments.map((comment, index) => {
        const {body, createdAt, imageUrl, userHandle} = comment
        return (
          <Fragment key={createdAt}>
            <Grid item sm={12}>
              <Grid container>
                <Grid item sm={2}>
                  <img src={imageUrl} alt={"comment"} className={classes.commentImage}/>
                </Grid>
                <Grid item sm={9}>
                  <div className={classes.commentData}>
                    <Typography variant={"h5"} component={Link} to={`/users/${userHandle}`} color={"primary"}>
                      {userHandle}
                    </Typography>
                    <Typography variant={"body2"} color={"textSecondary"}>
                      {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant={"body1"}>{body}</Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            {index !== comments.length - 1 && <hr className={classes.visibleSeparator}/>}
          </Fragment>
        )
      })}
    </Grid>
  )
}

Comment.propTypes = {
  comments: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
}

const styles = theme => ({...theme.customStyles})

export default withStyles(styles)(Comment)
