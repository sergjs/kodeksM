import React from "react";
import DatePicker from '../DatePickerCustom';
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import "./index.scss";

export const DateInput = ({
  id,
  type,
  position,
  isFilter,
  selected,
  index,
  handleChange,
  submit
}) => {

  const isIE = /*@cc_on!@*/false || !!document.documentMode;

  const options = [
    { value: '0', label: `Точно` },
    { value: '1', label: `По` },
    { value: '2', label: `C` },
    { value: '3', label: `Период` },
    { value: '4', label: `Вне периода` },
  ];

  const renderInputs = (selected) => {
    switch (selected) {
      case '3':
      case '4': {
        return (
          <div style={isIE ? { marginLeft: '12px' } : { marginLeft: '15px' }}>
            <DatePicker
              name={`id_${id}_type_${type}_values[0]`}
              value={submit?.formAttr[`id_${id}_type_${type}_values[0]`] || ''}
              onChange={(value) =>
                handleChange(`id_${id}_type_${type}_values[0]`, value)
              }
            />
            <label>-</label>
            <DatePicker
              name={`id_${id}_type_${type}_values[1]`}
              value={submit?.formAttr[`id_${id}_type_${type}_values[1]`] || ''}
              onChange={(value) =>
                handleChange(`id_${id}_type_${type}_values[1]`, value)
              }
            />
          </div>
        );
      }
      default: {
        return (
          <div style={isIE ? { marginLeft: '19px' } : { marginLeft: '22px' }}>
            <DatePicker
              name={`id_${id}_type_${type}_values[${position}]`}
              value={submit?.formAttr?.[`id_${id}_type_${type}_values[${position}]`] || ''}
              onChange={(value) =>
                handleChange(
                  `id_${id}_type_${type}_values[${position}]`,
                  value
                )
              }
            />
          </div>
        );
      }
    }
  };

  return (
    <div className={"date-select"}>
      <DropDownMenu
        id={`dateMode${index}`}
        parentId={"form-attr-search"}
        value={submit[`id_${id}_type_${type}_mode`]}
        onChange={value =>
          handleChange(`id_${id}_type_${type}_mode`, value)
        }
        options={options}
        width={"150px"}
        height={"32px"}
      />
      <div className={"date-select_dates"}>{renderInputs(selected)}</div>
    </div>
  );
};
