import React, {Fragment} from "react"
import PropTypes from "prop-types"
import {withStyles, Card, CardMedia, CardContent} from "@material-ui/core"

import blankProfileImage from "../images/blank.jpg"

function ScreamSkeleton(props)  {
    const classes = props.classes
    return (
      <Fragment>
        {Array.from({length: 5}).map((item, index) => (
          <Card className={classes.card} key={index}>
            <CardMedia className={classes.cover} image={blankProfileImage}/>
            <CardContent className={classes.cardContent}>
              <div className={classes.handle}/>
              <div className={classes.date}/>
              <div className={classes.fullLine}/>
              <div className={classes.fullLine}/>
              <div className={classes.halfLine}/>
            </CardContent>
          </Card>
        ))}
      </Fragment>
    )
}

ScreamSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
}

const styles = theme => ({...theme.customStyles})

export default withStyles(styles)(ScreamSkeleton)
