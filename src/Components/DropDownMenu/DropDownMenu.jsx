import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from "react-dom";
import classNames from 'classnames';
import "./index.scss"

const DropDownMenu = (props) => {

  const {
    width,
    height = '32px', //in px
    options,
    id, //уникальный id дропдауна
    value,
    onChange,
    placeholder,
    parentId, //id блока, внутри которого отслеживается видимость дропдауна
    isMultiselect = false,
    canSelect = true,
  } = props;

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(false);
  const [multiSelect, setMultiSelect] = useState([]);
  const [dropdown, setDropdown] = useState(null);

  const multiSelectMaxValues = 3;
  const multiSelectMaxHeight = 250;
  const nameField = useRef(null);
  const actualWidth = parseInt(width, 10) - 56;
  const heightPositionWithOptions =
    parseInt(height, 10) * (options.length + 1) > multiSelectMaxHeight
      ? multiSelectMaxHeight
      : parseInt(height, 10) * (options.length);

  useEffect(() => {
    window.addEventListener(`click`, onClose, true);
    window.addEventListener(`scroll`, onClose, true);
    window.addEventListener(`resize`, onClose, true);
    return () => {
      window.removeEventListener(`click`, onClose, true);
      window.removeEventListener(`scroll`, onClose, true);
      window.removeEventListener(`resize`, onClose, true);
    };
  }, []);

  useEffect(() => {
    setDropdown(nameField.current)
  }, [nameField.current])

  useEffect(() => {
    if (value || value == 0) setSelected(value)
    if (isMultiselect) setMultiSelect(value)
  }, [value]);

  const hasClass = (node, className) => {
    return node && node.classList
      ? node.classList.contains(className)
      : false;
  };

  const onClose = (e) => {
    if (e.type === 'resize') return setOpen(false);
    if (e.target.classList.contains('uiIcon')) return;
    if (!hasClass(e.target, `menu_${id}`)) {
      setOpen(false)
    }
  };

  const getElem = (id) => (
    document.querySelector(`#${id}`)
  );

  const parentElem = getElem(parentId);

  const elementInViewport = () => {
    const areaHeight = parentElem.offsetHeight
    const dropdownPosition = (
      dropdown.getBoundingClientRect().top -
      parentElem.getBoundingClientRect().top
    ) + dropdown.offsetHeight;
    return (
      (areaHeight >= dropdownPosition) &&
      (document.body.clientHeight >= dropdown.getBoundingClientRect().top +
        heightPositionWithOptions + dropdown.offsetHeight)
    )
  };

  const checkHandleOptions = (option) => {
    if (
      !!option.label &&
      onChange
    ) {
      if (!multiSelect.find(elem => elem.label == option.label)) {
        setMultiSelect([...multiSelect, option]);
        onChange([...multiSelect, option])
      } else {
        setMultiSelect(multiSelect.filter(item => item.value !== option.value))
        onChange(multiSelect.filter(item => item.value !== option.value))
      }
    }
  }

  const handlerOnClick = (option) => {
    canSelect && setSelected(option.value)
    setOpen(false)
    onChange && onChange(option.value)
  }

  const optionsPosition = (top) => {
    const heightPosition = multiSelectMaxHeight > dropdown.offsetHeight
      ? dropdown.offsetHeight
      : multiSelectMaxHeight;

    if (elementInViewport()) {
      return `calc(${top}px + ${heightPosition}px - 2px)`
    } else if (isMultiselect) {
      return `calc(${top}px - ${heightPositionWithOptions}px)`
    } else {
      return height
        ? `calc(${top}px - ${height} * ${options.length})`
        : `calc(${top}px - ${dropdown.offsetHeight - 1}px * ${options.length})`
    }
  };

  const renderOptions = (top, left) => (
    <div
      className={
        `dropdown_options${!elementInViewport() ? '_up' : ''} 
        ${isMultiselect && `kApp-box   menu_${id}`}`
      }
      style={{
        width,
        top: optionsPosition(top),
        left: `calc(${left}px - 1px)`,
        maxHeight: `${multiSelectMaxHeight}px`,
        boxShadow: 'none',
        [isMultiselect &&
          (elementInViewport() ? 'paddingTop' : 'paddingBottom')]: '2px',
      }}
    >
      {options.map((option, idx) => (
        <div key={idx}
          className={classNames({
            dropdown_options_item: true,
            current: isMultiselect
              ? multiSelect.find(elem => elem.label == option.label)
              : option.value === selected,
            [`menu_${id}`]: true,
          })}
          style={isMultiselect
            ? { height, lineHeight: '2' }
            : { height, lineHeight: `${dropdown?.offsetHeight - 1}px` }}
          onClick={() => {
            isMultiselect
              ? checkHandleOptions(option)
              : handlerOnClick(option)
          }}
        >
          {option.label}
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div
        className={classNames({
          dropdown: true,
          opened_down: open && elementInViewport(),
          opened_up: open && !elementInViewport(),
          [`menu_${id}`]: true
        })}
        style={isMultiselect
          ? {
            width,
            minHeight: height,
          }
          : { width, height }
        }
        id={id}
        onClick={(e) => {
          isMultiselect
            ? !e.target.classList.contains('uiIcon') && setOpen(!open)
            : setOpen(!open)
        }}
      >
        <div
          className={`dropdown_selected menu_${id}`}
          style={
            isMultiselect
              ? { maxWidth: `${actualWidth}px`, paddingLeft: '0px' }
              : { display: 'flex', alignItems: 'center' }
          }
          ref={nameField}
        >
          {!isMultiselect
            ?
            options.find(option => option.value === selected)?.label ||
            placeholder ||
            options[0]?.label
            :
            <>
              {
                multiSelect.map((elem, i) => (
                  <div style={{ display: "inline-block" }}>
                    {(i < multiSelectMaxValues
                      || multiSelect.length === multiSelectMaxValues + 1)
                      && <div className='multiSelect_value'>
                        <div className='multiSelect_value_label'
                          style={{ maxWidth: `${actualWidth - 35}px` }}
                        >
                          {elem.label}
                        </div>
                        <span className={'uiIcon _close _accent _small'}
                          onClick={() => {
                            const arrOptions = [...multiSelect.filter(item =>
                              item.label !== elem.label
                            )];
                            setMultiSelect(arrOptions);
                            onChange(arrOptions);
                          }}
                        ></span>
                      </div>
                    }
                  </div>
                ))}
              {
                (multiSelect.length - multiSelectMaxValues > 0
                  && multiSelect.length !== multiSelectMaxValues + 1)
                && <div style={{ display: "inline-block" }} >
                  <div className='multiSelect_value disabled'>
                    <div className='multiSelect_value_label disabled_text'
                      style={{ maxWidth: `${actualWidth - 35}px`, cursor: 'default' }}
                    >
                      {`Ещё выбрано ${multiSelect.length - multiSelectMaxValues}`}
                    </div>
                  </div>
                </div>
              }
              {
                multiSelect.length === 0
                && <p style={{ height: `calc(${height} - 2px)` }}
                  className='placeholder'
                >
                  {placeholder || 'Выбирите значения'}
                </p>
              }
            </>
          }
        </div>
        {
          isMultiselect
          &&
          <div
            className={`${!!multiSelect.length && 'uiIcon _close  _small _accent'}`}
            style={(!multiSelect.length)
              ? { marginLeft: `20px` }
              : { marginTop: '5px' }
            }
            onClick={() => {
              open
                ? setOpen(true)
                : setOpen(false)
              setMultiSelect([]);
              onChange([]);
            }}
          >
          </div>
        }
        <div className={`dropdown_icon menu_${id}`}>
          {
            isMultiselect
            && <span className='indicator_separator'></span>
          }
          <div
            className={`dropdown_icon_content${open ? '_opened' : ''} menu_${id}`}
          />
        </div>
      </div>
      {
        open && createPortal(
          renderOptions(
            dropdown.getBoundingClientRect().top,
            dropdown.getBoundingClientRect().left
          ),
          getElem('root')
        )}
    </>
  )
}

export default DropDownMenu;
