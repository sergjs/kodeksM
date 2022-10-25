import React, { memo } from "react";
import './index.scss'

const TextInput = memo(({ id, type, handleChange, submit }) => {

  return (
    <input
      type="text"
      name={`id_${id}_type_${type}_value`}
      value={submit?.formAttr?.[`id_${id}_type_${type}_value`] || ''}
      className="it"
      style={{height: '32px'}}
      onChange={e => handleChange(`id_${id}_type_${type}_value`, e.target.value)}
    />
  );
});

export default TextInput;