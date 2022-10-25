import React from "react";
import { Icon, Input } from "k6-ui";
import DatePicker from "./datePicker";

const CustomInput = React.forwardRef(
  ({ onChange, onClick, name, value, min }, ref) => (
    <Input
      min={min}
      ref={ref}
      name={name}
      value={value}
      onChange={({ target: { value } }) => {
        onChange({ target: { value } });
      }}
      placeholder="__.__.____"
      onBlur={({ target: { value } }) => {
        const [day, month, year] = value ? value.split(`.`) : [];
        const date = new Date(+year, +month - 1, +day);
        const isValidDate =
          Boolean(+date) &&
          date.getDate() === +day &&
          date.getMonth() === +month - 1;
        if (!isValidDate) {
          return onChange({ target: { value: `` } });
        }
      }}
    >
      <Icon className="uiIcon _flat _date _accent" onClick={onClick} />
    </Input>
  )
);

function DateCustom(props) {
  const { type, name, onChange, value, required, min, fullWidth } = props;
  if (type === "period") {
    return (
      <div style={{ display: "flex" }}>
        <DatePicker customInput={<CustomInput />} min={min} />
        <span style={{ paddingTop: "7px", margin: "0 10px 0 12px" }}>–</span>
        <DatePicker customInput={<CustomInput />} min={min} />
      </div>
    );
  }
  return (
    <DatePicker
      min={min}
      required={required}
      name={name}
      onChange={onChange}
      selected={value}
      customInput={<CustomInput />}
      fullWidth={fullWidth}
    />
  );
}

export default DateCustom;
