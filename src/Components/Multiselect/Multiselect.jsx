import React from "react";
import './index.css'

const Multiselect = ({ options, setOptions }) => {
  return (
    <div className="modal_row_multiselect">
        <textarea className="text_multiselect">
      {options.map(text => {
        return (
        <>
            <p>{text}</p>
           <span
              // onClick={() => closeModal()}
              className="uiIcon _close _accent _small"
            >
            </span> 
         </>
        )
      })}
       </textarea>
    </div>
  )
}

export default Multiselect;