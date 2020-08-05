import React from "react"
import {Tooltip, IconButton, CircularProgress} from "@material-ui/core"

function TooltipIconButton({children, onClick, title, buttonClass, tipClass, loading, disabled}) {
  return (
    <Tooltip title={title} className={tipClass} placement={"top"}>
      <span>
        <IconButton onClick={onClick} className={buttonClass} disabled={disabled || loading}>
          {children} {loading && <CircularProgress size={30} style={{position: "absolute"}}/>}
        </IconButton>
      </span>
    </Tooltip>
  );
}

export default TooltipIconButton
