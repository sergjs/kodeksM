import React, { useEffect, useState } from "react";
import { usePopper } from "react-popper";
import { Input } from "k6-ui";
import { arrColor } from "../ModalSettingObj/ModalSettingObj";

const ModalRowInputRadio = ({ row, setSubmit, submit }) => {
  const [isColorPopup, setIsColorPopup] = useState(false)
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);

  useEffect(() => {
    window.addEventListener(`click`, onClose)
    return () => {
      window.removeEventListener(`click`, onClose);
    }
  }, [])

  const onClose = (e) => {
    if (e.target.classList.contains('arrow')) return;
    if (e.target.classList.contains('input__file')) return;
    if (e.target.classList.contains('href_load')) return;
    if (e.target.classList.contains('elem_color')) return;
    setIsColorPopup(false)
  }

  const handlerBorder = e => {
    Object.values(popperElement?.children).forEach(child => {
      child.style.borderColor === e.target.style.backgroundColor
        ? child.style.borderColor = '#0d62ff'
        : child.style.borderColor = child.style.backgroundColor
    });
    setIsColorPopup(false)
  }

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
  console.log(row.typeCheckbox)
  return (<>
    {
      row.nameInputs.map((nameInput, idx) => {
        return (
          <div className="row_input_elem" key={row.title + nameInput}>
            <input
              className={`${row.typeCheckbox ? 'uiCheckbox' : 'uiRadio'}`}
              id={`${row.title + nameInput}`}
              name={`${row.title}`}
              type={`${row.typeCheckbox ? row.typeCheckbox : 'radio'}`}
              onChange={({ target }) => {
                setSubmit(prev => ({ ...prev, [target.name]: idx }))
              }}
            />
            <label htmlFor={`${row.title + nameInput}`}>{nameInput}</label>
            {
              (row.nameInputs.length === idx + 1 && row.buttonInput === 'Загрузить')
              && <div className='input__file'>
                {
                  submit[row.title] === row.nameInputs.length - 1
                  && <input
                    type="file"
                    name={`${nameInput + "file"}`}
                    id={`${nameInput + "file"}`}
                  />
                }
                <label
                  className={
                    `${submit[row.title] === row.nameInputs.length - 1
                    && 'href_load'}`
                  }
                  htmlFor={`${nameInput + "file"}`}
                >
                  {row.buttonInput}
                </label>
              </div>
            }
            {
              (row.nameInputs.length === idx + 1 && row.buttonInput === 'input')
              && <div style={{ marginLeft: '20px' }}>
                <Input
                  placeholder='Выберите значения'
                  width='204px'
                  disabled={submit[row.title] !== row.nameInputs.length - 1}
                />
              </div>
            }
            {
              (row.nameInputs.length === idx + 1 && row.buttonInput === 'Выбрать')
              && <p ref={setReferenceElement}
                className={`input__file 
                ${submit[row.title] === row.nameInputs.length - 1
                  && 'href_load'}`}
                onClick={() => submit[row.title] === row.nameInputs.length - 1
                  && setIsColorPopup(!isColorPopup)
                }
              >
                {row.buttonInput}
              </p>
            }
            {
              isColorPopup
              && <div
                className="arrow"
                ref={setPopperElement}
                style={styles.popper}
                {...attributes.popper}
              >
                {arrColor.map(color => {
                  return (
                    <div key={color}
                      onClick={e => handlerBorder(e)}
                      className="elem_color"
                      style={{
                        backgroundColor: `${color}`,
                        border: `3px solid ${color}`
                      }}
                    >
                    </div>
                  )
                })}
              </div>
            }
          </div>
        )
      })
    }
  </>
  )
}

export default ModalRowInputRadio;