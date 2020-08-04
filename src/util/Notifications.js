import React, {useState, Fragment} from "react"
import PropTypes from "prop-types"
import {Link} from "react-router-dom"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import {connect} from "react-redux"
import {Menu, MenuItem, IconButton, Tooltip, Typography, Badge} from "@material-ui/core"
import {Notifications as NotificationIcon, Favorite, Chat as ChatIcon} from "@material-ui/icons"
import {markNotificationRead} from "../redux/userAction"

function Notifications(props) {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onMenuOpened = () => {
    // noinspection JSUnresolvedVariable
    const unreadNotifications = props.notifications
      .filter(notification => !notification.read)
      .map(notification => notification.notificationId)
    props.markNotificationRead(unreadNotifications)
  }

  const notifications = props.notifications
  const unReadCount = notifications.filter(notification => !notification.read).length
  const notificationPresent = !!(notifications && notifications.length > 0)
  dayjs.extend(relativeTime)

  const notificationsMarkup = notificationPresent ? (
    notifications.map(notification => {
      // noinspection JSUnresolvedVariable
      const createdAt = notification.createdAt
      const verb = notification.type === "like" ? "liked" : "commented on"
      const time = dayjs(createdAt).fromNow()
      const iconColor = notification.read ? "primary" : "secondary"
      const icon = notification.type === "like" ?
        <Favorite color={iconColor} style={{marginRight: 10}}/> :
        <ChatIcon color={iconColor} style={{marginRight: 10}}/>
      return (
        <MenuItem key={createdAt} onClick={handleClose}>
          {icon}
          <Typography component={Link} color={"primary"} variant={"body1"}
                      to={`/users/${notification.recipient}/scream/${notification.screamId}`}>
            {notification.sender} {verb} your scream {time}
          </Typography>
        </MenuItem>
      )
    })
  ) : (
    <MenuItem onClick={handleClose}>
      You have no notifications
    </MenuItem>
  )

  return (
    <Fragment>
      <Tooltip placement={"top"} title={"Notifications"}>
        <IconButton onClick={handleOpen}>
          {notificationPresent && unReadCount > 0 ? (
            <Badge badgeContent={unReadCount} color={"secondary"}>
              <NotificationIcon/>
            </Badge>
          ) : <NotificationIcon/>}
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} onEntered={onMenuOpened}>
        {notificationsMarkup}
      </Menu>
    </Fragment>
  )
}

Notifications.propTypes = {
  markNotificationRead: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired
}

const mapStateToProps = state => ({notifications: state.user.notifications})

export default connect(mapStateToProps, {markNotificationRead})(Notifications)
