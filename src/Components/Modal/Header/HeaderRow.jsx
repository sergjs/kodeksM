import React, { useState } from "react";
import { usePopper } from "react-popper";

const HeaderRow = ({ row }) => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        name: 'arrow',
      },
      {
        name: "offset",
        options: {
          offset: [0, 7],
        },
      },],
  });
  return (
    <div className="modal_row_title">
      <h4
        style={row.fontWeight
          && { fontWeight: `${row.fontWeight}` }
        }
        ref={setReferenceElement}
      >
        {row.title}
      </h4>
      {
        row.isPrompt
        && <div className="info_wrapper">
          <span
            style={row.title.length > 18
              ? {
                position: 'relative',
                bottom: '-21px',
                right: '45px'
              }
              : { marginLeft: '7px' }
            }
            className="uiIcon _info"
          >
          </span>
          <div
            className="arrow popper_style"
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            {row.isPrompt}
          </div>
        </div>
      }
    </div>
  )
}

export default HeaderRow;