import React from "react"
import {Tooltip, IconButton} from "@material-ui/core"

function ScreamButton({children, onClick, title, buttonClass, tipClass}) {
  return (
    <Tooltip title={title} className={tipClass} placement={"top"}>
      <IconButton onClick={onClick} className={buttonClass}>
        {children}
      </IconButton>
    </Tooltip>
  );
}

export default ScreamButton