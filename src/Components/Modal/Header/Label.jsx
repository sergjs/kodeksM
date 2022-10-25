import React, { memo } from "react";

export const Label = memo(({ customName, name, style }) => (
  <div className={"col-3"} style={style}>
    <label>{customName || name}</label>
  </div>
));
