import React from 'react'
import { Portal } from 'react-overlays'
import DatePicker from 'react-datepicker'
import classNames from 'classnames'
import './index.scss'

function popperContainer({ children }) {
  return <Portal>{children}</Portal>
}

function DatePickerCustom({ name, selected, onChange, customInput, required, min, fullWidth }) {
  const classes = classNames({
    invalid: !selected && required,
    fullWidth: !!fullWidth
  })
  return (
    <label className={classes}>
      <DatePicker
        popperContainer={popperContainer}
        customInput={customInput}
        onChange={onChange}
        name={name}
        selected={selected}
        dateFormat="dd.MM.yyyy"
        strictParsing
        fixedHeight
        minDate={min}
        // locale={'ru'}
        style={{width: '400px'}}
      />
    </label>
  )
}

export default DatePickerCustom
