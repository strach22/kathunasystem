import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { TextField } from "@mui/material";
import React from "react";

export default function DatePickerH(props) {
  // eslint-disable-next-line react/prop-types
  const { name, label, value, onChange } = props;

  // eslint-disable-next-line no-shadow
  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        displayStaticWrapperAs="desktop"
        disableToolbar
        variant="inline"
        inputVariant="outlined"
        label={label}
        inputFormat="MM/dd/yyyy"
        name={name}
        value={value}
        onChange={(date) => onChange(convertToDefEventPara(name, date))}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
